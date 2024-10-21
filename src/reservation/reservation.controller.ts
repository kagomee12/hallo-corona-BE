import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../guard/roles.decorator';
import { Prisma, Status } from '@prisma/client';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('patient')
  @Post()
  create(@Body() createReservationDto: Prisma.ReservationCreateInput, @Request() req: any) {
    const patientId = req.user.id;
    return this.reservationService.create({ ...createReservationDto, patient: { connect: { id: patientId } } });
  }

  @Get()
  findAll() {
    return this.reservationService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get("patient")
  findByPatientId(@Request() req: any) {
    const patientId = req.user.id;
    return this.reservationService.findByPatientId(patientId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('doctor')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto, @Request() req: any) {
    const doctorId = req.user.id;
    return this.reservationService.update(+id, { message: updateReservationDto.message, status: updateReservationDto.status as Status, doctorId: doctorId });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(+id);
  }
}
