import { GetPokemons } from "@/domain/usecases";
import { memo, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import style from './index.module.css';

type Props = {
    remotePokemon: GetPokemons
}

const Itens: React.FC<Props> = ({ remotePokemon }: Props) => {
    const [pokemons, SetPokemons] = useState<any>();

    useEffect(() => {
        async function getPokemons() {
            let pokemons = await remotePokemon.getAll({
                limit: 5
            });

            SetPokemons(pokemons);
        };

        getPokemons();
    }, []);

    const handleOnDragEnd = (result: any) => {
        if (!result.destination) return;

        let items = Array.from(pokemons);
        let [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        SetPokemons(items);
    }

    return (
        <div className={style.boxItens}>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="pokemonsItens">
                    {(provided) =>
                    (
                        <ul className={style.box} {...provided.droppableProps} ref={provided.innerRef}>
                            {pokemons?.map((item: any, index: number) => (
                                <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                                    {(provided) => (
                                        <div className={style.item} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <div className={style.imgDiv}>
                                                <img className={style.img} src={item.sprites.other.dream_world.front_default} />
                                            </div>
                                            <div className={style.labelDiv}>
                                                <label className={style.label}>
                                                    {item.name[0].toUpperCase() + item.name.slice(1)}
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default memo(Itens);