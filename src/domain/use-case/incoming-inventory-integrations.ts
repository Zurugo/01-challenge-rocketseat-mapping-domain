import { UniqueEntityID } from "@/core/entities/unique.entity-id"
import { IncomingInventoryIntegration } from "../entities/incoming-inventory-integration"
import { IncomingInventoryIntegrationRepository } from "../repositories/incoming-inventory-integration-repository"



interface IncomingInventoryIntegrationRequest {
    supplierId: string
    productId: string
    estimatedDatedToReceiveProduct: Date
}

export class CreateIncomingInventoryIntegrationUseCase {
    constructor(
        private incomingIntegrationInventoryRepository: IncomingInventoryIntegrationRepository
    ) {}

    async execute({ supplierId, productId, estimatedDatedToReceiveProduct }: IncomingInventoryIntegrationRequest) {
        const integration = IncomingInventoryIntegration.create({
            supplierId: new UniqueEntityID(supplierId),
            productId: new UniqueEntityID(productId),
            estimatedDatedToReceiveProduct
        })

        await this.incomingIntegrationInventoryRepository.create(integration)

        return integration
    }
}