/*
 *  Copyright (c) 2019-2022 Miha Jamsek and/or its affiliates
 *  and other contributors as indicated by the @author tags and
 *  the contributor list.
 *
 *  Licensed under the MIT License (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  https://opensource.org/licenses/MIT
 *
 *  The software is provided "AS IS", WITHOUT WARRANTY OF ANY KIND, express or
 *  implied, including but not limited to the warranties of merchantability,
 *  fitness for a particular purpose and noninfringement. in no event shall the
 *  authors or copyright holders be liable for any claim, damages or other
 *  liability, whether in an action of contract, tort or otherwise, arising from,
 *  out of or in connection with the software or the use or other dealings in the
 *  software. See the License for the specific language governing permissions and
 *  limitations under the License.
 */

/**
 * Wrapper class for list of entities and total count of entities.
 * @author Miha Jamsek
 * @since 0.0.1
 */
export class EntityList<E> {
    private readonly _count: number;
    private readonly _entities: E[];
    private readonly _offset?: number;
    private readonly _limit?: number;
    
    /**
     * Creates empty list.
     * @returns empty {@link EntityList} with empty array and total count of <code>0</code>
     */
    public static empty(): EntityList<void> {
        return new EntityList([], 0);
    }
    
    /**
     * Creates {@link EntityList} from given list and total count.
     * @param entities list of entities
     * @param count count of all entities (usually different from list size, if list represents only part of a collection).
     * @param limit max number of results returned at once (typically actual list size)
     * @param offset index of first result in the returned list
     * If no count is provided, it defaults to length of entities array
     * @returns new instance of {@link EntityList} with given list of entities and total count.
     * @throws {ReferenceError} If entity list is null. To create empty list, method {@link empty} should be used instead.
     */
    public static of<E>(entities: E[], count?: number, limit?: number, offset?: number): EntityList<E> {
        if (!entities) {
            throw new ReferenceError("entities must not be null!");
        }
        let entityCount = entities.length;
        if (count) {
            entityCount = count;
        }
        
        return new EntityList<E>(entities, entityCount, limit, offset);
    }
    
    private constructor(entities: E[], count: number, limit?: number, offset?: number) {
        this._entities = entities;
        this._count = count;
        if (limit) {
            this._limit = limit;
        }
        if (offset) {
            this._offset = offset;
        }
    }
    
    /**
     * List of entities
     */
    public get entities(): E[] {
        return this._entities;
    }
    
    /**
     * Total count of entities
     */
    public get count(): number {
        return this._count;
    }
    
    /**
     * Number of results returned at once
     */
    public get limit(): number | undefined {
        return this._limit;
    }
    
    /**
     * Index of first result in the returned list
     */
    public get offset(): number | undefined {
        return this._offset;
    }
}
