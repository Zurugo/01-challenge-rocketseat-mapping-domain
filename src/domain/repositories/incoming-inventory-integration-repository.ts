import { IncomingInventoryIntegration } from "../entities/incoming-inventory-integration"

export interface IncomingInventoryIntegrationRepository {
    create(data: IncomingInventoryIntegration): Promise<void>
}