import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) { }

  async create(createReservationDto: Prisma.ReservationCreateInput) {
    try {
      const reservation = await this.prisma.reservation.create({
        data: createReservationDto,
      });
      return {
        status: 'success',
        message: 'Reservation created successfully',
        data: reservation,
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Failed to create reservation',
        error: error.message,
      };
    }
  }

  async findAll() {
    try {
      const oneDayLater = new Date();
      oneDayLater.setDate(oneDayLater.getDate() + 1);

      const reservations = await this.prisma.reservation.findMany({
        where: { consultationDate: { lt: oneDayLater.toISOString() } },
      });
      return {
        status: 'success',
        message: 'Reservations retrieved successfully',
        data: reservations,
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Failed to retrieve reservations',
        error: error.message,
      };
    }
  }

  async findOne(id: number) {
    try {
      const reservation = await this.prisma.reservation.findUnique({
        where: { id },
      });
      if (!reservation) {
        return {
          status: 'error',
          message: `Reservation with ID ${id} not found`,
        };
      }
      return {
        status: 'success',
        message: 'Reservation retrieved successfully',
        data: reservation,
      };
    } catch (error) {
      return {
        status: 'error',
        message: `Failed to retrieve reservation with ID ${id}`,
        error: error.message,
      };
    }
  }

  async findByPatientId(patientId: number) {
    try {
      const reservations = await this.prisma.reservation.findMany({
        where: { patientId },
      });
      return {
        status: 'success',
        message: `Reservations for patient ID ${patientId} retrieved successfully`,
        data: reservations,
      };
    } catch (error) {
      return {
        status: 'error',
        message: `Failed to retrieve reservations for patient ID ${patientId}`,
        error: error.message,
      };
    }
  }

  async update(id: number, updateReservationDto: Prisma.ReservationUpdateInput) {
    try {
      const reservation = await this.prisma.reservation.findUnique({ where: { id } });
      if (!reservation) {
        return {
          status: 'error',
          message: `Reservation with ID ${id} not found`,
        };
      }

      if (reservation.status === 'accepted' || reservation.status === 'rejected') {
        return {
          status: 'error',
          message: 'Reservation has already been accepted or rejected',
        };
      }

      const updatedReservation = await this.prisma.reservation.update({
        where: { id },
        data: updateReservationDto,
      });
      return {
        status: 'success',
        message: 'Reservation updated successfully',
        data: updatedReservation,
      };
    } catch (error) {
      return {
        status: 'error',
        message: `Failed to update reservation with ID ${id}`,
        error: error.message,
      };
    }
  }

  async remove(id: number) {
    try {
      const reservation = await this.prisma.reservation.findUnique({ where: { id } });
      if (!reservation) {
        return {
          status: 'error',
          message: `Reservation with ID ${id} not found`,
        };
      }

      await this.prisma.reservation.delete({
        where: { id },
      });
      return {
        status: 'success',
        message: `Reservation with ID ${id} deleted successfully`,
      };
    } catch (error) {
      return {
        status: 'error',
        message: `Failed to delete reservation with ID ${id}`,
        error: error.message,
      };
    }
  }
}
