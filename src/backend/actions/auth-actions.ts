"use server";

import LoginType from "@/backend/interfaces/login-type";
import RegisterType from "@/backend/interfaces/register-type";
import { Company, User } from "@/backend/models";
import createToken from "@/helpers/create-token";
import { DataCrypt, DataDecrypt } from "@/helpers/data-cryptor";
import CustomeResponse from "@/helpers/response-message";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};
export const register = async (newUser: RegisterType) => {
  try {
    const existUser = await User.findOne({
      where: {
        email: newUser.email,
      },
    });

    if (existUser) {
      return CustomeResponse({
        status: false,
        message: "User already exist",
      });
    }
    const hashedPassword = await hashPassword(newUser.password);
    const cryptedName = await DataCrypt(newUser.name);
    const cryptedPhone = await DataCrypt(newUser.phone);
    const user = await User.create({
      name: cryptedName,
      phone: cryptedPhone,
      email: newUser.email,
      password: hashedPassword,
    });

    if (!user) {
      return CustomeResponse({
        status: false,
        message: "User not created",
      });
    }

    return CustomeResponse({
      status: true,
      message: "User created successfully",
      data: user.dataValues.uuid
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
      message: "User not created",
    });
  }
};

export const login = async (user: LoginType) => {
  try {
    const existUser = await User.findOne({
      where: {
        email: user.email,
      },
    });

    if (!existUser) {
      return CustomeResponse({
        status: false,
        message: "Kullanıcı bulunamadı",
      });
    }

    const checkPassword = await bcrypt.compare(
      user.password,
      existUser.dataValues.password
    );
    if (!checkPassword) {
      return CustomeResponse({
        status: false,
        message: "Email veya şifre yanlış",
      });
    }

    const company = await Company.findOne({
      where: {
        userUuid: existUser.dataValues.uuid,
      },
    });

    if (!company) {
      // Şirket yoksa farklı bir mesaj döndür
      return CustomeResponse({
        status: true,
        message: "Şirket oluşturulmamış, lütfen devam edin.",
        data: {
          companyUuid: "",
          userUuid: existUser.dataValues.uuid,
        },
      });
    }

    const payload = {
      uuid: existUser.dataValues.uuid,
      email: existUser.dataValues.email,
      name: await DataDecrypt(existUser.dataValues.name),
      phone: await DataDecrypt(existUser.dataValues.phone),
      isCompanyCreated: existUser.dataValues.isCompanyCreated,
      companyUuid: company?.dataValues.uuid || "",
    };

    const token = await createToken(payload);
    const cryptedToken = await DataCrypt(token);
    const cookieStore = await cookies();

    cookieStore.set({
      name: "uToken",
      value: cryptedToken,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 1 month
    });

    // Şirket varsa başarı mesajı gönder
    return CustomeResponse({
      status: true,
      message: "Giriş başarılı",
      data: {
        companyUuid: company.dataValues.uuid,
        userUuid: existUser.dataValues.uuid,
      },
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
      message: "Giriş başarısız",
    });
  }
};


export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("uToken");
  return CustomeResponse({
    status: true,
    message: "Çıkış Yapıldı!",
  });
};