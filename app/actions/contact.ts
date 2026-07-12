'use server'

import { db } from '@/lib/db'
import { contactSubmissions } from '@/lib/db/schema'
import fs from 'fs/promises'
import path from 'path'

export interface ContactFormInput {
  fullName: string
  phone: string
  description: string
}

export async function submitContactForm(data: ContactFormInput) {
  // Simple validation
  if (!data.fullName || data.fullName.trim() === '') {
    return { success: false, error: 'Full name is required.' }
  }
  if (!data.phone || data.phone.trim() === '') {
    return { success: false, error: 'Phone number is required.' }
  }
  if (!data.description || data.description.trim() === '') {
    return { success: false, error: 'Description is required.' }
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
    return { success: true }
  } catch (dbError: any) {
    console.warn(
      'Database connection failed or table does not exist. Falling back to local file storage. Error:',
      dbError.message || dbError
    )

    // Fallback: Save to a local JSON file in the project directory
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
      return { success: true, fallback: true }
    } catch (fileError: any) {
      console.error('Local file fallback failed as well:', fileError.message || fileError)
      return { success: false, error: 'Failed to process your request. Please try again later.' }
    }
  }
}
