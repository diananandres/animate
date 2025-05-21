import connectMongoDB from "@/config/database";
import { NextResponse } from "next/server";
import Usuarios from "@/models/usuarios";

export const POST = async (request) => {
    const { nombre, rol, seccion } = await request.json();
    await connectMongoDB();
    await Usuarios.create({
        nombre,
        rol,
        seccion
    });
    return NextResponse.json({ message: "Usuario creado correctamente" }, { status: 201 });
}

    