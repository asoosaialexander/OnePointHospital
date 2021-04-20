export interface Appointment {
    id: number;
    patientId: number;
    doctorId: number;
    hospitalId: number;
    appointmentTime: string;
    appointmentType: string;
    isCancelled: boolean;
    cancellationReason: string;
    createdOn: string;
    createdBy: string;
}