export interface activity {
  id: number;
  courseId: number;
  courseType: string;
  courseTitle: string;
  courseDesc: string | null;
  teacherDisplayName: string | null;
  assessmentResult: string | null;
  dateStarted: number;
  dateCompleted: number;
  sourceId: number | null;
  mediaData: string | null;
  noteId: string | null;
  liveClassRecordingLink: string | null;
  url: string | null;
  status: string | null;
  transcript: string | null;
}
