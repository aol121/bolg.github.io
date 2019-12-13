<template>
  <div class="box">
    <div class="top">
      <img class="top-img" height="73" src="/wzp/img/top-1.png" alt="">
      <div class="middle">
        <img class="mid-img" height="235" src="/wzp/img/mid-2.png" alt="">
        <div class="bottom">
          <img class="bot-img" height="79" src="/wzp/img/bot.png" >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style>
  html,body {
    padding:0;
    margin:0;
  }
  
  .box {
    position: absolute;
    display: inline-block;
    left:50%;
    transform: translateX(-50%);
    top:57px;
  }
  .box .top {
    text-align: center;
    transform-origin: top center;
    transform: rotate(-2deg);
    animation: top-swing 4s ease-in-out infinite;
    perspective:1000px;
  }
  .box .top-img {
    position: relative;
    z-index: 2;
  }
  .box .middle {
    margin-top:-28px;
    transform-origin:center 28px;
    transform: rotate3d(0, 1, 0, 20deg);
    animation: mid-swing 6s ease-in-out infinite;
  }
  .box .bottom {
    margin-top:-18px;
    transform-origin:center top;
    transform: rotate(3deg);
    animation: bot-swing 6s ease-in-out infinite;
  }
  @keyframes top-swing {
    0% { transform: rotate(-2deg); }
    50% { transform: rotate(2deg);}
    100% { transform: rotate(-2deg);}
  }
  @keyframes mid-swing {
    0% { transform: rotate3d(0, 1, 0, 20deg); }
    50% { transform: rotate3d(0, 1, 0, -20deg);}
    100% { transform: rotate3d(0, 1, 0, 20deg);}
  }
  @keyframes bot-swing {
    0% { transform: rotate(3deg); }
    50% { transform: rotate(-3deg);}
    100% { transform: rotate(3deg);}
  }
  
</style>
