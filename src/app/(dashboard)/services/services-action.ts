
"use server";

import ServiceType from "@/backend/interfaces/service-type";
import { Service } from "@/backend/models";
import { dbDataParser } from "@/helpers/db-data-parser";
import CustomeResponse from "@/helpers/response-message";





export const createService = async (data: ServiceType, companyUuid: string) => {
    try {

        const existService = await Service.findOne({
            where: {
                name: data.name,
                companyUuid: companyUuid
            }
        });

        if (existService) {
            return CustomeResponse({
                status: false,
                message: "Hizmet zaten mevcut",
            })
        }

        const createdService = await Service.create({
            name: data.name,
            price: data.price,
            duration: data.duration,
            companyUuid: companyUuid
        });

        if (!createdService) {
            return CustomeResponse({
                status: false,
                message: "Hizmet oluşturulamadı",
            })
        }

        return CustomeResponse({
            status: true,
            message: "Hizmet oluşturuldu",
            data: dbDataParser(createdService)
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

export const updateService = async (data: ServiceType) => {
    try {
        const existService = await Service.findByPk(data.uuid);

        if (!existService) {
            return CustomeResponse({
                status: false,
                message: "Hizmet bulunamadı",
            })
        }

        const updatedService = await existService.update({
            name: data.name,
            price: data.price,
            duration: data.duration,
        });

        if (!updatedService) {
            return CustomeResponse({
                status: false,
                message: "Hizmet güncellenemedi",
            })
        }

        return CustomeResponse({
            status: true,
            message: "Hizmet güncellendi",
            data: dbDataParser(updatedService)
        })


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

export const deleteService = async (uuid: string) => {
    try {
        const existService = await Service.findByPk(uuid);

        if (!existService) {
            return CustomeResponse({
                status: false,
                message: "Hizmet bulunamadı",
            })
        }

        await existService.destroy();
        return CustomeResponse({
            status: true,
            message: "Hizmet silindi",
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

export const fetchServices = async (companyUuid: string) => {
    try {
        const services = await Service.findAll({
            where: {
                companyUuid: companyUuid
            }
        });

        return CustomeResponse({
            status: true,
            message: "Hizmetler getirildi",
            data: dbDataParser(services)
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