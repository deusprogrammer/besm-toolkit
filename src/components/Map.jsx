import { Stage, Graphics, Text, Container } from '@pixi/react';
import { TextStyle } from 'pixi.js';
import React, { useEffect, useState } from 'react';

let Circle = ({ x, y, r, color, alpha, text, pointerup, pointerdown, pointermove, pointerupoutside }) => {
    return (
        <Container
            x={x}
            y={y}
            interactive
            pointerup={pointerup}
            pointerdown={pointerdown}
            pointermove={pointermove}
            pointerupoutside={pointerupoutside}
        >
            <Graphics
                draw={(g) => {
                    g.clear();
                    g.beginFill(color, alpha);
                    g.drawCircle(r, r, r);
                    g.endFill();
                }}
            />
            <Text
                text={text}
                anchor={{ x: 0.5, y: 0.5 }}
                x={r}
                y={r}
                style={
                    new TextStyle({
                        align: 'center',
                        fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
                        fontSize: 10
                    })} />
        </Container>
    )
}

export default ({ combatants }) => {
    const [gamePieces, setGamePieces] = useState([]);

    useEffect(() => {
        let temp = combatants.map((combatant, index) => {
            combatant.y = 0;
            combatant.x = index * 64;
            return combatant;
        });
        setGamePieces(temp);
    }, []);

    const onDragStart = (event) => {
        const sprite = event.currentTarget;
        sprite.alpha = 0.5;
        sprite.data = event.data;
        sprite.dragging = true;
    };

    const onDragEnd = (event) => {
        const sprite = event.currentTarget;
        sprite.alpha = 1;
        sprite.dragging = false;
        sprite.data = null;
    };

    const onDragMove = (event) => {
        const sprite = event.currentTarget;
        if (sprite.dragging) {
            console.table(sprite.data);
            const newPosition = sprite.data.global;
            sprite.x = newPosition.x;
            sprite.y = newPosition.y;
        }
    };

    return (
        <Stage>
            {gamePieces.map(({ combatantName, x, y }) => {
                return (
                    <Circle
                        x={x}
                        y={y}
                        r={32}
                        color={0xFFFFFF}
                        alpha={1.0}
                        text={combatantName}
                        pointerup={onDragEnd}
                        pointerdown={onDragStart}
                        pointermove={onDragMove}
                        pointerupoutside={onDragEnd}
                    />
                )
            })}
        </Stage>
    );
};