import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { setupSwagger } from "./config/swagger";
import UserRouter from "./routes/user.router";
import PetRouter from "./routes/pet.router";
import VeterinarianRouter from "./routes/veterinarian.routes";
import ConsultationRouter from "./routes/consultation.router";
import InvoiceRouter from "./routes/invoice.router";
import AppointmentRouter from "./routes/appointment.router";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Routes
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the Veterinary API", version: "1.0.0" });
});

app.use("/api/users", UserRouter);
app.use("/api/pets", PetRouter);
app.use("/api/veterinarians", VeterinarianRouter);
app.use("/api/consultations", ConsultationRouter);
app.use("/api/invoices", InvoiceRouter);
app.use("/api/appointments", AppointmentRouter);

setupSwagger(app);

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Conectado a PostgresSQL");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar a PostgresSQL:", err);
  });
