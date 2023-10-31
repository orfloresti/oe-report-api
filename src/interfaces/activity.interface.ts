export interface activity {
  id: number;
  courseId: number;
  courseType: string;
  courseTitle: string;
  courseDesc?: string;
  teacherDisplayName?: string;
  assessmentResult?: string;
  dateStarted: number;
  dateCompleted: number;
  sourceId?: number;
  mediaData?: string;
  noteId?: string;
  liveClassRecordingLink?: string;
  url?: string;
  status?: string;
  transcript?: string;
}
