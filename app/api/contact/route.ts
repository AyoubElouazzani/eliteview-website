import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { contactSubmissions } from '@/lib/db/schema'
import fs from 'fs/promises'
import path from 'path'
import os from 'os'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders })
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Simple validation
    if (!data.fullName || data.fullName.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Full name is required.' },
        { status: 400, headers: corsHeaders }
      )
    }
    if (!data.phone || data.phone.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Phone number is required.' },
        { status: 400, headers: corsHeaders }
      )
    }
    if (!data.description || data.description.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Description is required.' },
        { status: 400, headers: corsHeaders }
      )
    }

    const submission = {
      fullName: data.fullName.trim(),
      phone: data.phone.trim(),
      description: data.description.trim(),
      createdAt: new Date(),
    }

    try {
      // Attempt database insert
      await db.insert(contactSubmissions).values(submission)
      console.log('Successfully saved contact submission to the database.')
      return NextResponse.json({ success: true }, { status: 200, headers: corsHeaders })
    } catch (dbError: any) {
      console.warn(
        'Database connection failed or table does not exist. Falling back to local file storage. Error:',
        dbError.message || dbError
      )

      // Fallback 1: Save to a local JSON file in the project directory
      try {
        const fallbackFilePath = path.join(process.cwd(), 'contact-submissions.json')
        
        let submissionsList: any[] = []
        try {
          const fileContent = await fs.readFile(fallbackFilePath, 'utf-8')
          submissionsList = JSON.parse(fileContent)
        } catch (readError) {
          // File doesn't exist or is empty/corrupt, start a new list
        }

        submissionsList.push(submission)

        await fs.writeFile(
          fallbackFilePath,
          JSON.stringify(submissionsList, null, 2),
          'utf-8'
        )
        console.log(`Successfully saved contact submission to local fallback: ${fallbackFilePath}`)
        return NextResponse.json({ success: true, fallback: true }, { status: 200, headers: corsHeaders })
      } catch (fileError: any) {
        console.warn('Local project directory file fallback failed, trying system temp directory:', fileError.message || fileError)

        // Fallback 2: Save to system temporary directory (guaranteed writable in serverless/production EROFS)
        try {
          const tempFilePath = path.join(os.tmpdir(), 'contact-submissions.json')
          
          let submissionsList: any[] = []
          try {
            const fileContent = await fs.readFile(tempFilePath, 'utf-8')
            submissionsList = JSON.parse(fileContent)
          } catch (readError) {
            // File doesn't exist or is empty/corrupt, start a new list
          }

          submissionsList.push(submission)

          await fs.writeFile(
            tempFilePath,
            JSON.stringify(submissionsList, null, 2),
            'utf-8'
          )
          console.log(`Successfully saved contact submission to system temp fallback: ${tempFilePath}`)
          return NextResponse.json({ success: true, fallback: true }, { status: 200, headers: corsHeaders })
        } catch (tempFileError: any) {
          console.error('System temp file fallback failed as well:', tempFileError.message || tempFileError)
          return NextResponse.json(
            { success: false, error: 'Failed to process your request. Please try again later.' },
            { status: 500, headers: corsHeaders }
          )
        }
      }
    }
  } catch (error: any) {
    console.error('API Contact Error:', error)
    return NextResponse.json(
      { success: false, error: 'Malformed request body or server error.' },
      { status: 500, headers: corsHeaders }
    )
  }
}
