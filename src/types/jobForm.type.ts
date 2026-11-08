type JobType = 'full-time' | 'part-time' | 'contract' | 'internship'

export interface JobFormData {
  title: string
  companyName: string
  category: string
  jobType: JobType
  isRemote: boolean
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  salaryFrequency: string
  responsibilities: string
  requirements: string
}
