import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly dbIndicator: TypeOrmHealthIndicator,
    private readonly memoryIndicator: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      // 1) Postgres ping (uses your existing TypeORM connection)
      () => this.dbIndicator.pingCheck('postgres', { timeout: 1500 }),

      // 2) Heap usage (fail if >150 MB)
      () => this.memoryIndicator.checkHeap('heap', 150 * 1024 * 1024),

      // 3) RSS usage (fail if >300 MB)
      () => this.memoryIndicator.checkRSS('rss', 300 * 1024 * 1024),
    ]);
  }
}
