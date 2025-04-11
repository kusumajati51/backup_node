import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { Order } from "../../interceptor/constatnt/order.constant";

export class PageOptionsDTO {
  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 100,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  readonly limit?: number = 10;

  @Type(() => String)
  @IsString()
  readonly order_by = "id";

  get skip(): number {
    var skip = (this.page - 1) * this.limit;
    if (skip == null) {
      skip = 0;
    }
    // console.log(skip);
    return skip;
  }

  get orderList() {
    if (this.order === Order.ASC || this.order === Order.asc) {
      return 'ASC';
    } else {
      return 'DESC';
    }
  }
}
