export interface MeetingDetailDto {
    id: number;
    meetingName: string;
    startDate: Date;
    endDate: Date;
    description?: string;
    documentPath?: string;
}