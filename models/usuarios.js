import mongoose, {Schema} from "mongoose";

const UsuariosSchema = new Schema(
    {
        nombre: String,
        rol: String,
        seccion: String
      },
      {
        timestamps: true,
      }
);

const Usuarios = mongoose.models.Usuarios || mongoose.model("Usuarios", UsuariosSchema);

export default Usuarios;