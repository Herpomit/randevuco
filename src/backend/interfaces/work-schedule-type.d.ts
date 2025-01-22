export interface WorkScheduleType {
    uuid: string; // Benzersiz kimlik (UUID formatında)
    employeeUuid: string; // Çalışana ait benzersiz kimlik (UUID formatında)
    day: string; // Gün (örnek: "Monday", "Tuesday")
    startTime: string | null; // Çalışma başlangıç saati (HH:mm formatında) veya null
    endTime: string | null; // Çalışma bitiş saati (HH:mm formatında) veya null
    isWorking: boolean; // O gün çalışıp çalışmadığını belirten boolean
    createdAt?: Date; // Oluşturulma tarihi (opsiyonel)
    updatedAt?: Date; // Güncellenme tarihi (opsiyonel)
}

export default WorkScheduleType