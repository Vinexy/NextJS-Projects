"use client";
import Image from "next/image";

import React, { useRef, useState, useEffect } from "react";

import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "./utilities";

import * as fp from "fingerpose";
import victory from "./victory.png";
import thumbs_up from "./thumbs_up.png";
import pp from "./myPhoto.jpg";

import Lottie from "react-lottie";
import animationData from "./like.json";
import "./globals.css";

import Heart from "react-animated-heart";

function App() {
  const [isClick, setClick] = useState(false);
  const [data, setData] = useState([]);
  const [check, setCheck] = useState(true);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [emoji, setEmoji] = useState(null);
  const images = { thumbs_up: thumbs_up, victory: victory };

  const [tweets, setTweets] = useState([
    {
      tw: "I was fired from Twitter this morning. I was responsible for the timeline refreshing the second you saw a good tweet",
      fav: false,
      pos: 342,
    },
    {
      tw: "Decided to decline my $20,000 loan forgiveness. Grind never stops. I wish Biden would ADD $20,000 to my debt just so I can grind even HARDER",
      fav: false,
      pos: 554,
    },
    {
      tw: "Queen Elizabeth will return in Multiverse of Madness",
      fav: false,
      pos: 765,
    },
    {
      tw: "being on Twitter right now is like playing the violin on the titanic except we are also making fun of the iceberg and the iceberg is getting genuinely mad",
      fav: false,
      pos: 977,
    },
    {
      tw: "liked your story” so who’s gonna text first",
      fav: false,
      pos: 1188,
    },
    {
      tw: "Idea to replace Twitter: we all get added to the same Google Doc and see what happens",
      fav: false,
      pos: 1400,
    },
    {
      tw: "Do you know anything about ‘Don’t Worry Darling?’” — my mom, reading me the movie listings this morning at the start of what she assumed would be a brief phone call.",
      fav: false,
      pos: 1611,
    },
  ]);

  const runHandpose = async () => {
    const net = await handpose.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const hand = await net.estimateHands(video);

      if (hand.length > 0) {
        if (check) {
          window.scrollTo(hand[0].landmarks[0][0], hand[0].landmarks[8][1] * 5);
        }

        const GE = new fp.GestureEstimator([
          fp.Gestures.ThumbsUpGesture,
          fp.Gestures.VictoryGesture,
        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 4);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          // console.log(gesture.gestures);
          setCheck(false);
          const confidence = gesture.gestures.map(
            (prediction) => prediction.score
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );
          const updateState = () => {
            const staty = tweets?.map((tweet) => {
              if (
                canvasRef.current.offsetTop > tweet.pos + 500 &&
                canvasRef.current.offsetTop < tweet.pos + 650 &&
                gesture.gestures[maxConfidence].name == "victory" &&
                tweet.fav === true
              ) {
                return { ...tweet, fav: false };
              } else if (
                canvasRef.current.offsetTop > tweet.pos + 500 &&
                canvasRef.current.offsetTop < tweet.pos + 650 &&
                tweet.fav === false &&
                gesture.gestures[maxConfidence].name == "thumbs_up"
              ) {
                return { ...tweet, fav: true };
              } else {
                return { ...tweet };
              }
            });

            setTweets(staty);
          };
          updateState();

          //console.log(tweets);
        } else {
          setCheck(true);
        }
      }
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  useEffect(() => {
    runHandpose();
  }, []);

  return (
    <div className="app">
      <header className="App-header">
        <Webcam
          Id="o"
          ref={webcamRef}
          style={{
            position: "-webkit-sticky",
            display: "flex",
            position: "absolute",
            position: "sticky",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: -1,
            width: 720,
            height: 480,
            top: 200,
            opacity: 0.5,
          }}
        />

        <canvas
          Id="e"
          ref={canvasRef}
          style={{
            position: "-webkit-sticky",
            position: "absolute",
            position: "sticky",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: -1,
            width: 720,
            height: 480,
            top: 200,
          }}
        />
        {/* NEW STUFF */}
        <div className="title">TweetLO</div>

        {tweets.map((item) => (
          <div className="tweet">
            <span>
              <Image width={100} height={100} src={pp} />
              <div>@afatih98</div>
            </span>
            <div className="tweetContent">
              <div>{item?.tw}</div>
              <div className="heart">
                <Heart className="like" isClick={item?.fav} />
              </div>
            </div>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
