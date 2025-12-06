/**
 * Base mapper class for bidirectional entity-DTO transformation
 * Provides generic mapping functionality that can be extended by specific mappers
 */
export abstract class BaseMapper<Entity, DTO> {
  /**
   * Maps a single entity to its DTO representation
   * @param entity - The entity to map
   * @returns The mapped DTO
   */
  abstract toDTO(entity: Entity): DTO;

  /**
   * Maps a DTO to its entity representation
   * @param dto - The DTO to map
   * @returns The mapped entity (partial or complete depending on implementation)
   */
  abstract fromDTO(dto: DTO): Partial<Entity>;

  /**
   * Maps an array of entities to their DTO representations
   * @param entities - The array of entities to map
   * @returns Array of mapped DTOs
   */
  toDTOList(entities: Entity[]): DTO[] {
    return entities.map((entity) => this.toDTO(entity));
  }

  /**
   * Maps an array of DTOs to their entity representations
   * @param dtos - The array of DTOs to map
   * @returns Array of mapped entities
   */
  fromDTOList(dtos: DTO[]): Partial<Entity>[] {
    return dtos.map((dto) => this.fromDTO(dto));
  }

  /**
   * Maps a single entity to DTO, returning null if entity is null/undefined
   * @param entity - The entity to map (can be null/undefined)
   * @returns The mapped DTO or null
   */
  toDTOOrNull(entity: Entity | null | undefined): DTO | null {
    return entity ? this.toDTO(entity) : null;
  }

  /**
   * Maps a single DTO to entity, returning null if DTO is null/undefined
   * @param dto - The DTO to map (can be null/undefined)
   * @returns The mapped entity or null
   */
  fromDTOOrNull(dto: DTO | null | undefined): Partial<Entity> | null {
    return dto ? this.fromDTO(dto) : null;
  }
}
