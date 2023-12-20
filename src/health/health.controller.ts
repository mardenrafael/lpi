import { Controller, Get } from '@nestjs/common';
import { HealthCheckResponseDto } from './dto/health-check-response.dto';
import { IsPublic } from 'src/is-public/is-public.decorator';

@Controller('health')
export class HealthController {
  @IsPublic()
  @Get('/check')
  async check(): Promise<HealthCheckResponseDto> {
    const healthCheckResponseDto: HealthCheckResponseDto =
      new HealthCheckResponseDto();

    healthCheckResponseDto.health = true;

    return healthCheckResponseDto;
  }
}
