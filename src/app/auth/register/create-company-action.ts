"use server";

import CompanyType from "@/backend/interfaces/company";
import { Company, User } from "@/backend/models";
import CustomeResponse from "@/helpers/response-message";




export const createCompany = async (data: CompanyType) => {
    try {

        const existUser = await User.findByPk(data.userUuid);

        if (!existUser) {
            return CustomeResponse({
                status: false,
                message: "Kullanıcı bulunamadı.",
            });
        }

        const existCompany = await Company.findOne({
            where: {
                userUuid: data.userUuid,
            },
        });

        if (existCompany) {
            return CustomeResponse({
                status: false,
                message: "Kullanıcı zaten bir firma kaydı var.",
            });
        }

        const createdCompany = await Company.create({
            name: data.name,
            phone: data.phone,
            city: data.city,
            sector: data.sector,
            location_lat: data.location_lat,
            location_long: data.location_long,
            userUuid: data.userUuid
        });

        if (!createdCompany) {
            return CustomeResponse({
                status: false,
                message: "Firma olusturulamadi.",
            });
        }

        await existUser.update({
            isCompanyCreated: true,
        });


        return CustomeResponse({
            status: true,
            message: "Firma olusturuldu.",
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
            message: "Firma olusturulamadi.",
        });

    }
}