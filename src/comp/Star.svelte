<script>
  export let breakage = 100
  let percentage = breakage/100

  let margin = 0

  if (breakage !== 100){
    margin = (-percentage+2)*3
  }

</script>
<div class="star-container flex items-center justify-center" style="width: {22.5*percentage}%; margin-left: {margin-10}px">
  <div class="star">
  </div>
  
</div>

<style>
  .star-container{
    scale: 50%;
    margin: -10px;
    overflow: hidden;
  }
.star {
  height: 45px;
  width: 45px;
  background: url("/star.png");
}
:hover.star {
  height: 45px;
  width: 45px;
  background: url("/star.png");
  animation-name: sprite;
  animation-duration: .3s;
  animation-timing-function: steps(8);
  animation-iteration-count: 1;
}
@keyframes sprite {
  from { background-position: 0px; }
  to { background-position: -360px; }
}


</style>