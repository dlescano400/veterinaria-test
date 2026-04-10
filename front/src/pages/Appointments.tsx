import { useEffect, useState } from "react";
import { IlamyCalendar } from "@ilamy/calendar";
import { Drawer } from "../component/Drawer";
import appointmentStore from "../store/appointmentStore";
import petStore from "../store/petStore";
import { useDrawerStore } from "../store/useDrawerStore";
import { toastSuccess, toastError } from "../utils/toast";
import { CalendarEvent } from "../types";
import { Clock, Check, X } from "lucide-react";

const spanishTranslations = {
  today: 'Hoy',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  year: 'Año',
  previous: 'Anterior',
  next: 'Siguiente',
  sunday: 'Domingo',
  monday: 'Lunes',
  tuesday: 'Martes',
  wednesday: 'Miércoles',
  thursday: 'Jueves',
  friday: 'Viernes',
  saturday: 'Sábado',
  january: 'Enero',
  february: 'Febrero',
  march: 'Marzo',
  april: 'Abril',
  may: 'Mayo',
  june: 'Junio',
  july: 'Julio',
  august: 'Agosto',
  september: 'Septiembre',
  october: 'Octubre',
  november: 'Noviembre',
  december: 'Diciembre',
  event: 'Evento',
  events: 'Eventos',
  noEvents: 'No hay eventos',
  allDay: 'Todo el día',
  start: 'Inicio',
  end: 'Fin',
  title: 'Título',
  description: 'Descripción',
  save: 'Guardar',
  cancel: 'Cancelar',
  delete: 'Eliminar',
  edit: 'Editar',
  add: 'Agregar',
  close: 'Cerrar',
  create: 'Crear',
  createEvent: 'Crear Evento',
  update: 'Actualizar',
  newEvent: 'Nuevo Evento',
  new: 'Nuevo',
  editEvent: 'Editar Evento',
  ok: 'Aceptar',
  clear: 'Limpiar',
  moreEvents: '+{count} más',
  eventDeleted: 'Evento eliminado',
  eventAdded: 'Evento agregado',
  eventUpdated: 'Evento actualizado',
  eventDeletedError: 'Error al eliminar evento',
  eventAddedError: 'Error al agregar evento',
  eventUpdatedError: 'Error al actualizar evento',
  repeat: 'Repetir',
  daily: 'Diario',
  weekly: 'Semanal',
  monthly: 'Mensual',
  yearly: 'Anual',
  location: 'Ubicación',
  organizer: 'Organizador',
  attendees: 'Asistentes',
  timezone: 'Zona horaria',
  selectTimezone: 'Seleccionar zona horaria',
  allDayEvent: 'Evento de todo el día',
  time: 'Hora',
  date: 'Fecha',
  name: 'Nombre',
  select: 'Seleccionar',
  color: 'Color',
  startDate: 'Fecha de inicio',
  endDate: 'Fecha de fin',
  startTime: 'Hora de inicio',
  endTime: 'Hora de fin',
  addNewEvent: 'Agregar un nuevo evento a tu calendario',
  editEventDetails: 'Editar detalles del evento',
  eventTitlePlaceholder: 'Título del evento',
  eventDescriptionPlaceholder: 'Descripción del evento (opcional)',
  eventLocationPlaceholder: 'Ubicación del evento (opcional)',
  sun: 'Dom',
  mon: 'Lun',
  tue: 'Mar',
  wed: 'Mié',
  thu: 'Jue',
  fri: 'Vie',
  sat: 'Sáb',
  repeats: 'Repite',
  customRecurrence: 'Repetición personalizada',
  never: 'Nunca',
  count: 'Cantidad',
  every: 'Cada',
  ends: 'Termina',
  after: 'Después',
  occurrences: 'veces',
  on: 'El',
  editRecurringEvent: 'Editar evento recurrente',
  deleteRecurringEvent: 'Eliminar evento recurrente',
  editRecurringEventQuestion: 'es un evento recurrente. ¿Cómo te gustaría editarlo?',
  deleteRecurringEventQuestion: 'es un evento recurrente. ¿Cómo te gustaría eliminarlo?',
  thisEvent: 'Solo este evento',
  thisEventDescription: 'Solo cambiar esta ocurrencia específica',
  thisAndFollowingEvents: 'Este y siguientes',
  thisAndFollowingEventsDescription: 'Editar esto y todos los eventos futuros',
  allEvents: 'Todos los eventos',
  allEventsDescription: 'Editar toda la serie recurrente',
  onlyChangeThis: 'Solo cambiar esta ocurrencia',
  changeThisAndFuture: 'Cambiar esta y las futuras',
  changeEntireSeries: 'Cambiar toda la serie',
  onlyDeleteThis: 'Solo eliminar esta',
  deleteThisAndFuture: 'Eliminar esta y las futuras',
  deleteEntireSeries: 'Eliminar toda la serie',
  more: 'más',
  resources: 'Recursos',
  resource: 'Recurso',
  time: 'Hora',
  noResourcesVisible: 'Sin recursos visibles',
  addResourcesOrShowExisting: 'Agregar recursos o mostrar existentes',
};

export default function Appointments() {
  const appointmentData = appointmentStore();
  const petData = petStore();
  const { 
    appointments, 
    fetchAppointments, 
    deleteAppointment, 
    getCalendarEvents,
    updateAppointment 
  } = appointmentData;
  const { fetchPets } = petData;
  const { setEditingData } = useDrawerStore();

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [calendarKey, setCalendarKey] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    fetchAppointments();
    fetchPets();
  }, [fetchAppointments, fetchPets]);

  useEffect(() => {
    setEvents(getCalendarEvents());
  }, [appointments, getCalendarEvents]);

  const handleEventClick = (event: CalendarEvent) => {
    const apt = event.extendedProps?.appointment;
    if (apt) {
      setEditingData(apt);
      setIsDrawerOpen(true);
    }
  };

  const handleDelete = async (eventId: string) => {
    if (confirm("¿Estás seguro de eliminar este turno?")) {
      try {
        await deleteAppointment(eventId);
        toastSuccess("Turno eliminado");
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Error al eliminar";
        toastError(message);
      }
    }
  };

  const handleDateClick = ({ date }: { date: Date }) => {
    setEditingData({
      dateTime: date,
      petId: "",
      veterinarianId: "",
      status: "pending",
    });
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setCalendarKey(prev => prev + 1);
  };

  const handleStatusChange = async (eventId: string, newStatus: 'pending' | 'confirmed' | 'canceled') => {
    const apt = appointments.find(a => a.id === eventId);
    if (apt) {
      try {
        await updateAppointment({ ...apt, status: newStatus });
        toastSuccess("Estado actualizado");
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Error al actualizar";
        toastError(message);
      }
    }
  };

  return (
    <div className="h-full flex flex-col relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-pink-400">Agenda</h1>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-pink-500" />
            <span className="text-gray-400">Pendiente</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-gray-400">Confirmado</span>
          </div>
          <div className="flex items-center gap-2">
            <X className="w-4 h-4 text-red-500" />
            <span className="text-gray-400">Cancelado</span>
          </div>
        </div>
      </div>

      <div 
        className="flex-1 rounded-xl border-2 border-pink-500 shadow-lg shadow-pink-500/30 overflow-hidden"
        style={{ backgroundColor: '#1e1e38' }}
      >
        <div className="ilamy-calendar p-4" style={{ backgroundColor: 'transparent', color: 'white' }}>
          <IlamyCalendar
            key={calendarKey}
            events={events}
            onEventClick={handleEventClick}
            onDateClick={handleDateClick}
            disableDragAndDrop={true}
            firstDayOfWeek="monday"
            locale="es"
            translations={spanishTranslations}
          />
        </div>
      </div>

      {events.length > 0 && (
        <div className="mt-4 bg-[#1e1e38] rounded-xl border border-pink-500/30 p-4">
          <h3 className="text-lg font-semibold text-pink-400 mb-3">Turnos del día</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {events
              .filter(e => {
                const today = new Date();
                const eventDate = new Date(e.start);
                return eventDate.toDateString() === today.toDateString();
              })
              .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
              .map(event => {
                const apt = event.extendedProps?.appointment;
                const time = new Date(event.start).toLocaleTimeString('es-ES', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                });
                
                return (
                  <div 
                    key={event.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-pink-500/20 bg-[#16162a]"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: event.backgroundColor }}
                      ></div>
                      <div>
                        <p className="font-medium text-gray-200">{event.title}</p>
                        <p className="text-sm text-gray-400">{time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={apt?.status || 'pending'}
                        onChange={(e) => handleStatusChange(event.id, e.target.value as 'pending' | 'confirmed' | 'canceled')}
                        className="bg-[#1e1e38] text-gray-300 text-sm rounded px-2 py-1 border border-pink-500/30 focus:outline-none focus:border-pink-500"
                      >
                        <option value="pending">Pendiente</option>
                        <option value="confirmed">Confirmado</option>
                        <option value="canceled">Cancelado</option>
                      </select>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        title="Eliminar"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            {events.filter(e => new Date(e.start).toDateString() === new Date().toDateString()).length === 0 && (
              <p className="text-gray-500 text-center py-4">No hay turnos para hoy</p>
            )}
          </div>
        </div>
      )}

      <Drawer isOpen={isDrawerOpen} onClose={handleDrawerClose} />
    </div>
  );
}