import { UniqueEntityID } from "@/core/entities/unique.entity-id"
import { IncomingInventoryIntegration } from "../entities/incoming-inventory-integration"
import { IncomingInventoryIntegrationRepository } from "../repositories/incoming-inventory-integration-repository"
import { CreateIncomingInventoryIntegrationUseCase } from "./incoming-inventory-integrations"


const fakeIncomingInventoryIntegrationRepository: IncomingInventoryIntegrationRepository = {
    create: async (data: IncomingInventoryIntegration) => {
        return
    }
}

test('create a integration with supplier about incoming products', async () => {
    const instanceIntegration = new CreateIncomingInventoryIntegrationUseCase(fakeIncomingInventoryIntegrationRepository)

    const integrationData = await instanceIntegration.execute({
        supplierId: '1',
        productId: '1',
        estimatedDatedToReceiveProduct: new Date('2025-01-10T00:00:00Z')
    })

    expect(integrationData.id).toEqual(expect.any(UniqueEntityID))
})