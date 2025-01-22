"use server";

import { EmployeeType } from "@/backend/interfaces/employee-type";
import WorkScheduleType from "@/backend/interfaces/work-schedule-type";
import { Employee, EmployeeWorkSchedule } from "@/backend/models";
import { dbDataParser } from "@/helpers/db-data-parser";
import CustomeResponse from "@/helpers/response-message";




export const fetchEmployees = async (companyUuid: string) => {
    try {

        const employees = await Employee.findAll({
            where: {
                companyUuid: companyUuid
            }
        });

        return CustomeResponse({
            status: true,
            message: "Employees getirildi",
            data: dbDataParser(employees)
        });

    } catch (error) {
        if (error instanceof Error) {
            return CustomeResponse({
                status: false,
                message: error.message,
            })
        }

        return CustomeResponse({
            status: false,
            message: "Beklenmeyen bir hata olustu",
        })
    }
};

export const createEmployee = async (data: EmployeeType) => {
    try {

        const existEmployee = await Employee.findOne({
            where: {
                name: data.name,
                companyUuid: data.companyUuid
            }
        });

        if (existEmployee) {
            return CustomeResponse({
                status: false,
                message: "Çalışan zaten mevcut",
            })
        }

        const createdEmployee = await Employee.create({
            name: data.name,
            phone: data.phone,
            color: data.color,
            companyUuid: data.companyUuid
        });

        if (!createdEmployee) {
            return CustomeResponse({
                status: false,
                message: "Çalışan oluşturulamadı",
            })
        }

        // Varsayılan çalışma saatlerini tanımla
        const defaultSchedule = [
            { employeeUuid: createdEmployee.dataValues.uuid, day: "pazartesi", startTime: "09:00", endTime: "18:00", isWorking: true },
            { employeeUuid: createdEmployee.dataValues.uuid, day: "sali", startTime: "09:00", endTime: "18:00", isWorking: true },
            { employeeUuid: createdEmployee.dataValues.uuid, day: "carsamba", startTime: "09:00", endTime: "18:00", isWorking: true },
            { employeeUuid: createdEmployee.dataValues.uuid, day: "persembe", startTime: "09:00", endTime: "18:00", isWorking: true },
            { employeeUuid: createdEmployee.dataValues.uuid, day: "cuma", startTime: "09:00", endTime: "18:00", isWorking: true },
            { employeeUuid: createdEmployee.dataValues.uuid, day: "cumartesi", startTime: "09:00", endTime: "18:00", isWorking: true },
            { employeeUuid: createdEmployee.dataValues.uuid, day: "pazar", startTime: null, endTime: null, isWorking: false }
        ];

        await EmployeeWorkSchedule.bulkCreate(defaultSchedule);

        return CustomeResponse({
            status: true,
            message: "Çalışan oluşturuldu",
            data: dbDataParser(createdEmployee)
        });

    } catch (error) {
        if (error instanceof Error) {
            return CustomeResponse({
                status: false,
                message: error.message,
            })
        }

        return CustomeResponse({
            status: false,
            message: "Beklenmeyen bir hata olustu",
        })
    }
}

export const updateEmployee = async (data: EmployeeType) => {
    try {

        const existEmployee = await Employee.findByPk(data.uuid);

        if (!existEmployee) {
            return CustomeResponse({
                status: false,
                message: "Çalışan bulunamadı",
            })
        }

        const updatedEmployee = await existEmployee.update({
            name: data.name,
            phone: data.phone,
            color: data.color,
        });

        if (!updatedEmployee) {
            return CustomeResponse({
                status: false,
                message: "Çalışan güncellenemedi",
            })
        }

        return CustomeResponse({
            status: true,
            message: "Çalışan güncellendi",
            data: dbDataParser(updatedEmployee)
        });

    } catch (error) {
        if (error instanceof Error) {
            return CustomeResponse({
                status: false,
                message: error.message,
            })
        }

        return CustomeResponse({
            status: false,
            message: "Beklenmeyen bir hata olustu",
        })
    }
}

export const deleteEmployee = async (uuid: string) => {
    try {

        const existEmployee = await Employee.findByPk(uuid);

        if (!existEmployee) {
            return CustomeResponse({
                status: false,
                message: "Çalışan bulunamadı",
            })
        }

        await existEmployee.destroy();

        return CustomeResponse({
            status: true,
            message: "Çalışan silindi",
        });

    } catch (error) {
        if (error instanceof Error) {
            return CustomeResponse({
                status: false,
                message: error.message,
            })
        }

        return CustomeResponse({
            status: false,
            message: "Beklenmeyen bir hata olustu",
        })
    }
}

export const getWorkSchedule = async (uuid: string) => {
    try {

        const workSchedule = await EmployeeWorkSchedule.findAll({
            where: {
                employeeUuid: uuid
            }
        });

        return CustomeResponse({
            status: true,
            message: "Çalışan saatleri getirildi",
            data: dbDataParser(workSchedule)
        });

    } catch (error) {
        if (error instanceof Error) {
            return CustomeResponse({
                status: false,
                message: error.message,
            })
        }

        return CustomeResponse({
            status: false,
            message: "Beklenmeyen bir hata olustu",
        })
    }
}

export const updateWorkSchedule = async (data: WorkScheduleType[]) => {
    try {
        const updatePromises = data.map((schedule) =>
            EmployeeWorkSchedule.update(
                {
                    startTime: schedule.startTime,
                    endTime: schedule.endTime,
                    isWorking: schedule.isWorking,
                },
                {
                    where: {
                        uuid: schedule.uuid,
                    },
                }
            )
        );

        await Promise.all(updatePromises);

        if (!updatePromises) {
            return CustomeResponse({
                status: false,
                message: "Çalışma saatleri güncellenemedi",
            });
        }

        return CustomeResponse({
            status: true,
            message: "Çalışma saatleri başarıyla güncellendi",
        });
    } catch (error) {
        if (error instanceof Error) {
            return CustomeResponse({
                status: false,
                message: error.message,
            });
        }

        return CustomeResponse({
            status: false,
            message: "Beklenmeyen bir hata oluştu",
        });
    }
};