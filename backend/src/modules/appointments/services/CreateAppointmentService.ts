import { startOfHour, isBefore, getHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
export default class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, new Date(Date.now())))
      throw new AppError("You can't create an appoinment on a past date");

    if (user_id === provider_id)
      throw new AppError("You can't create an appoinment with yourself");

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17)
      throw new AppError('You can only create appoinments between 8am and 5pm');

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate)
      throw new AppError('This appointment is already booked');

    const appointment = await this.appointmentRepository.create({
      date: appointmentDate,
      user_id,
      provider_id,
    });

    return appointment;
  }
}
