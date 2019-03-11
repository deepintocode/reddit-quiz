<template>
  <div>
    <p>Your score was {{ playerScore }}</p>
    <button @click="quitToMenu">Quit To Main Menu</button>
  </div>
</template>

<script>
export default {
  props: {
    playerScore: Number
  },
  methods: {
    quitToMenu() {
      this.$emit('quitToMenu');
    }
  }
}
</script>

