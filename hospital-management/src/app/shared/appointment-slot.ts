export interface AppointmentSlot {
    id: number;
    type: string;
    doctorId: number;
    hospitalId: number;
    day: string;
    time: string;
    noOfSlots: number;
}