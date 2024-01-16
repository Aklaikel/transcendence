'use client';


import React, { useEffect, useRef } from 'react'
import { useMediaQuery } from '@/hooks/customHooks';

import { useDispatch, useSelector } from 'react-redux';
import { blue, red } from '@/redux_toolkit/game/gameSlice'

import Matter from 'matter-js'
import Result from '@/components/playgame/Result'

import Image from 'next/image'

import { gameFinshed } from '@/redux_toolkit/game/gameSlice';

// const imposible = () => {
//   Matter.Body.setPosition(boxA, { x: ball.position.x, y: 20 });
//   requestAnimationFrame(imposible);
// }

// imposible();

function PlayerBar() {
  const { blueResult, redResult, blueAvatar, redAvatar } = useSelector((state: any) => state.game)

  return (
    <div className="player-bar text-white flex  justify-between mb-5 items-center ">
      <div className='flex justify-between items-center w-36  bg-[#0079FF] p-1 rounded-md animate-pulse'>
        <div className='h-[60px] w-[60px] rounded-md overflow-hidden'>
          <Image src={blueAvatar} width={50} height={50} alt='user avatar' className='h-full w-full object-cover' />
        </div>
        <div className='font-semibold text-2xl antialiased m-auto'>{blueResult}</div>
      </div>

      <div className='flex justify-between items-center flex-row-reverse w-36 bg-red p-1 rounded-md'>
        <div className='h-[60px] w-[60px] rounded-md overflow-hidden'>
          <Image src={redAvatar} width={50} height={50} alt='user avatar' className='h-full w-full object-cover' />
        </div>
        <div className='font-semibold text-2xl antialiased m-auto'>{redResult}</div>
      </div>
    </div>
  )
}

export default function Game() {

  const isDesktop = useMediaQuery('(min-width: 1600px)')
  const scene = useRef<HTMLDivElement>(null)
  const THICCNESS = 60;
  const R_HEIGHT = 20;

  const { blueResult, redResult } = useSelector((state: any) => state.game)

  const dispatch = useDispatch();

  useEffect(() => {

    if (!scene.current) return;

    let Engine = Matter.Engine,

      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite;

    let engine = Engine.create(
      {
        gravity: {
          x: 0,
          y: 0,
          scale: 0.001
        }
      }
    );

    let render = Render.create({
      element: scene.current,
      engine: engine,
      options: {
        width: scene.current.offsetWidth,
        height: scene.current.offsetHeight,
        background: 'transparent',
        wireframes: false,
        showAngleIndicator: true
      }
    });

    let reactOptions = {
      isStatic: true,
      render: {
        fillStyle: '#F5EFE7'
      },
      chamfer: { radius: 10 }
    }

    let middle: number = scene.current.offsetWidth / 2;

    let boxA: Matter.Body = Bodies.rectangle(middle, 20, 150, R_HEIGHT, reactOptions);
    let boxB: Matter.Body = Bodies.rectangle(middle, scene.current.offsetHeight - R_HEIGHT, 150, R_HEIGHT,
      {
        isStatic: true,
        render: {
          fillStyle: '#F5EFE7'
        },
        chamfer: { radius: 10 }
      }
    );

    let ball: Matter.Body = Bodies.circle(scene.current.offsetWidth / 2, scene.current.offsetHeight / 2, 20,
      {
        restitution: 1,
        friction: 0,
        frictionAir: 0,
        inertia: Infinity
      }
    );

    Matter.Body.setVelocity(ball, { x: 10, y: 10 })

    let ground: Matter.Body = Bodies.rectangle(
      scene.current.offsetWidth / 2,
      scene.current.offsetHeight + (THICCNESS / 2),
      scene.current.offsetWidth,
      THICCNESS,
      { isStatic: true }
    );

    let floor: Matter.Body = Bodies.rectangle(
      scene.current.offsetWidth / 2,
      - (THICCNESS / 2),
      scene.current.offsetWidth,
      THICCNESS,
      { isStatic: true }
    );

    let wallLeft: Matter.Body = Bodies.rectangle(
      0 - THICCNESS / 2,
      scene.current.offsetHeight / 2,
      THICCNESS, scene.current.offsetHeight,
      { isStatic: true }
    );

    let wallRight: Matter.Body = Bodies.rectangle(
      scene.current.offsetWidth + THICCNESS / 2,
      scene.current.offsetHeight / 2,
      THICCNESS, scene.current.offsetHeight,
      { isStatic: true }
    );

    let mouse: Matter.Mouse = Matter.Mouse.create(render.canvas);
    let mouseConstraint: Matter.MouseConstraint = Matter.MouseConstraint.create(
      engine, {
      mouse: mouse
    });

    Composite.add(engine.world, [boxA, boxB, wallLeft, wallRight, ball, floor, ground]);
    Render.run(render);

    let runner = Runner.create();

    Runner.run(runner, engine);

    const responsive = () => {
      if (!scene.current) return;

      render.canvas.width = scene.current.offsetWidth;
      render.canvas.height = scene.current.offsetHeight;

      Matter.Body.setPosition(wallLeft,
        {
          x: - THICCNESS / 2,
          y: scene.current.offsetHeight / 2
        }
      );

      Matter.Body.setPosition(wallRight,
        {
          x: scene.current.offsetWidth + THICCNESS / 2,
          y: scene.current.offsetHeight / 2
        }
      );

      Matter.Body.setPosition(floor,
        {
          x: scene.current.offsetWidth / 2,
          y: - (THICCNESS / 2)
        }
      );

      Matter.Body.setPosition(ground,
        {
          x: scene.current.offsetWidth / 2,
          y: scene.current.offsetHeight + (THICCNESS / 2)
        }
      );

      Matter.Body.setPosition(boxA,
        {
          x: scene.current.offsetWidth / 2,
          y: 20
        }
      );

      Matter.Body.setPosition(boxB,
        {
          x: scene.current.offsetWidth / 2,
          y: scene.current.offsetHeight - R_HEIGHT
        }
      );
    }

    let animationRequested = false;

    const throttleAnimation = () => {
      Matter.Body.setPosition(boxB,
        {
          x: mouseConstraint.mouse.position.x,
          y: render.canvas.height - R_HEIGHT
        });
      animationRequested = false;
    }

    const playerMoves = () => {
      if (animationRequested || !scene.current) return;

      if (mouseConstraint.mouse.position.x - (150 / 2) <= -10) return;
      if (mouseConstraint.mouse.position.x + (150 / 2) >= scene.current.offsetWidth) return;
      requestAnimationFrame(() => { animationRequested = true; throttleAnimation(); });
    }

    const collision = () => {

      if (Matter.Collision.collides(ball, floor, 0)) dispatch(blue())
      if (Matter.Collision.collides(ball, ground, 0)) dispatch(red())

      requestAnimationFrame(collision);

    }

    window.addEventListener('resize', responsive)
    Matter.Events.on(mouseConstraint, "mousemove", playerMoves);
    collision();
    return () => { window.removeEventListener('resize', responsive) }

  }, [])


  useEffect(() => {

    if (redResult === 3 || blueResult === 3) {
      dispatch(gameFinshed())
    }

  }, [redResult, blueResult])

  return (
    <>
      {
        !isDesktop && <PlayerBar />
      }
      <div ref={scene} className='w-[90vw] h-[90vh] max-w-[600px] m-auto max-h-[900px] overflow-hidden cursor-none rounded-2xl bg-red' />
      {isDesktop && <Result />}
    </>
  )
}