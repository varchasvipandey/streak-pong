"use client";

import * as Phaser from "phaser";
import { useEffect } from "react";

const PingPongModule = () => {
  useEffect(() => {
    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="gameDiv" />;
};

const WINDOW_WIDTH = 600;
const WINDOW_HEIGHT = 600;
const INITIAL_PADDLE_SCALE_X = 0.4;
const INITIAL_PADDLE_SCALE_Y = 0.1;

class PingPongGame extends Phaser.Scene {
  private playerPaddle?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private opponentPaddle?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private ball?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  private ballVelocity = {
    y: 400,
    x: [200, -200][Math.floor(Math.random() * 2)],
  };

  private paddleVelocity = 250;

  constructor() {
    super();
  }

  preload() {
    this.load.crossOrigin = "anonymous";

    this.load.image(
      "paddle",
      "https://static.vecteezy.com/system/resources/thumbnails/010/975/682/small/blue-neon-button-glowing-neon-button-png.png",
    );
    this.load.image("ball", "https://static-00.iconduck.com/assets.00/red-circle-emoji-256x256-ygvaz1w9.png");
  }

  createNewPlayer(posY: number) {
    const player = this.physics.add.sprite(WINDOW_WIDTH / 4, posY, "paddle").setOrigin(0, 0);
    player.scaleX = INITIAL_PADDLE_SCALE_X;
    player.scaleY = INITIAL_PADDLE_SCALE_Y;
    player.setCollideWorldBounds();
    player.body.setImmovable();
    return player;
  }

  createNewBall() {
    const ball = this.physics.add.sprite(300, 300, "ball").setOrigin(0, 0);
    ball.scaleX = 0.1;
    ball.scaleY = 0.1;
    ball.setBounce(1);
    ball.setCollideWorldBounds();
    ball.setVelocity(this.ballVelocity.x, this.ballVelocity.y);
    return ball;
  }

  create() {
    this.playerPaddle = this.createNewPlayer(WINDOW_HEIGHT - 50);
    this.opponentPaddle = this.createNewPlayer(20);
    this.ball = this.createNewBall();

    this.physics.add.collider(this.playerPaddle, this.ball, () => {
      //   console.log(this.playerPaddle?.x);

      this.ball?.setVelocityX((this.playerPaddle?.body.velocity.x || Math.random() * 50) * 2);
      this.ball?.setVelocityY(this.ball.body.velocity.y * 1.05);

      this.paddleVelocity += 20;
    });

    this.physics.add.collider(this.opponentPaddle, this.ball, function (e) {});
  }

  update() {
    const cursors = this.input.keyboard?.createCursorKeys();

    if (cursors?.left.isDown) this.playerPaddle?.setVelocityX(-this.paddleVelocity);
    else if (cursors?.right.isDown) this.playerPaddle?.setVelocityX(this.paddleVelocity);
    else this.playerPaddle?.setVelocityX(0);
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: WINDOW_WIDTH,
  height: WINDOW_HEIGHT,
  scene: PingPongGame,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0, x: 0 },
      debug: false,
    },
  },
  backgroundColor: "#3a404a",
};

const game = new Phaser.Game(config);

export default PingPongModule;
