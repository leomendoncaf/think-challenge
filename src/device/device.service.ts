import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './entities/device.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
  ) {}

  create(createDeviceDto: CreateDeviceDto): Promise<Device> {
    const device: Device = new Device();
    device.local = createDeviceDto.local;
    device.name = createDeviceDto.name;
    device.type = createDeviceDto.type;
    device.user = createDeviceDto.user;
    return this.deviceRepository.save(device);
  }

  findAll(): Promise<Device[]> {
    return this.deviceRepository.find();
  }

  findOne(id: string) {
    return this.deviceRepository.findOneBy({ id });
  }

  update(id: string, updateDeviceDto: UpdateDeviceDto): Promise<Device> {
    const device: Device = new Device();
    device.local = updateDeviceDto.local;
    device.name = updateDeviceDto.name;
    device.type = updateDeviceDto.type;
    device.user = updateDeviceDto.user;
    device.id = id;
    return this.deviceRepository.save(device);
  }

  remove(id: string): Promise<{ affected?: number }> {
    return this.deviceRepository.delete(id);
  }
}
