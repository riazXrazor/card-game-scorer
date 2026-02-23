<template>
  <q-page class="q-pa-md flex flex-center">
    <div style="width: 100%; max-width: 400px;">
      <div class="text-center q-mb-xl">
        <h1 class="text-h4 text-weight-bolder q-mb-sm">Player Setup</h1>
        <p class="text-caption text-grey-5">Enter names for the 4 players</p>
      </div>

      <q-card class="bg-card q-pa-md border-radius-lg" flat style="border: 1px solid rgba(255,255,255,0.05)">
        <div class="q-gutter-y-md">
          <q-input
            v-for="(player, index) in localPlayers"
            :key="index"
            v-model="player.name"
            :label="`Player ${index + 1}`"
            outlined
            dark
            color="primary"
            class="setup-input"
            bg-color="dark-lighter"
          >
            <template v-slot:prepend>
              <q-avatar size="sm" color="primary" text-color="white" class="text-caption text-weight-bold">
                {{ player.name ? player.name.charAt(0).toUpperCase() : `P${index + 1}` }}
              </q-avatar>
            </template>
          </q-input>
        </div>

        <q-btn
          unelevated
          color="primary"
          class="full-width q-mt-xl q-py-sm text-weight-bold"
          style="border-radius: 12px; font-size: 1.05rem;"
          @click="startGame"
          :disable="!allPlayersNamed"
        >
          Start Game
          <q-icon name="play_arrow" size="sm" class="q-ml-sm" />
        </q-btn>
      </q-card>
      
      <div class="text-center q-mt-md">
        <q-btn flat class="text-grey-5" no-caps @click="$router.push('/')">Cancel</q-btn>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useGameStore } from '../stores/game'

const router = useRouter()
const route = useRoute()
const gameStore = useGameStore()

const gameType = ref(route.query.game || 'fish')

// Local state for the form, pre-filled with existing names or defaults
const localPlayers = ref([
  { id: 1, name: gameStore.players[0]?.name || 'Player 1' },
  { id: 2, name: gameStore.players[1]?.name || 'Player 2' },
  { id: 3, name: gameStore.players[2]?.name || 'Player 3' },
  { id: 4, name: gameStore.players[3]?.name || 'Player 4' }
])

const allPlayersNamed = computed(() => {
  return localPlayers.value.every(p => p.name && p.name.trim() !== '')
})

const startGame = () => {
  // Update store with new names and initials
  const updatedPlayers = localPlayers.value.map((p, index) => ({
    id: p.id,
    name: p.name.trim(),
    initial: p.name.trim().substring(0, 2).toUpperCase() || `P${index + 1}`
  }))
  
  gameStore.players = updatedPlayers
  gameStore.startGame(gameType.value)
  
  router.push(`/${gameType.value}`)
}
</script>

<style scoped>
.bg-card { background-color: #171c26 !important; }
.bg-dark-lighter { background-color: #21293a !important; }
.border-radius-lg { border-radius: 12px; }

.setup-input :deep(.q-field__control) {
  border-radius: 8px;
  border-color: rgba(255,255,255,0.05);
}
</style>
