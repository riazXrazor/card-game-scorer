<template>
  <q-page class="q-pa-md pb-120">
    <!-- Game Progress -->
    <div class="q-mb-md">
      <div class="row justify-between items-center text-caption text-weight-bold text-grey-5 q-mb-sm text-uppercase" style="letter-spacing: 0.5px">
        <span>Game Progress</span>
        <span class="text-primary" v-if="!gameStore.winnerId">Round {{ currentRound }} of {{ totalRounds }}</span>
        <span class="text-positive" v-else>Game Over</span>
      </div>
      <q-linear-progress :value="currentRound / totalRounds" :color="gameStore.winnerId ? 'positive' : 'primary'" track-color="dark-lighter" size="4px" />
    </div>

    <!-- Player Totals -->
    <div class="row q-col-gutter-sm q-mb-lg">
      <div class="col-3" v-for="player in gameStore.players" :key="'p'+player.id">
        <q-card class="bg-card q-py-sm q-px-xs text-center border-radius-lg" flat bordered :style="`border-color: ${gameStore.winnerId === player.id ? '#21ba45' : 'rgba(255,255,255,0.05)'}`">
           <q-icon v-if="gameStore.winnerId === player.id" name="emoji_events" color="positive" size="xs" class="q-mb-xs" />
          <div class="text-caption text-weight-bold text-grey-5" v-else>{{ player.initial }}</div>
          <div class="text-h6 text-weight-bolder" :class="gameStore.winnerId === player.id ? 'text-positive' : 'text-grey-3'">{{ getTotal(player.id) }}</div>
        </q-card>
      </div>
    </div>

    <!-- Score Table -->
    <div class="full-width q-mt-lg">
      <div class="row text-caption text-weight-bold text-grey-5 q-mb-md text-center" style="letter-spacing: 0.5px">
        <div class="col-2 text-left">ROUND</div>
        <div class="col-2 offset-1">P1</div>
        <div class="col-2">P2</div>
        <div class="col-2">P3</div>
        <div class="col-2">P4</div>
      </div>

      <div class="q-gutter-y-sm">
        <!-- Past and Current Rounds -->
        <div v-for="roundNum in totalRounds" :key="'r'+roundNum" 
             class="row items-center text-center q-py-sm border-radius-lg relative-position"
             :class="{'current-round-highlight': roundNum === currentRound && !gameStore.winnerId, 'q-px-sm': roundNum === currentRound && !gameStore.winnerId}">
             
          <div class="col-2 text-left text-weight-bold" :class="(roundNum === currentRound && !gameStore.winnerId) ? 'text-primary' : (roundNum > currentRound ? 'text-grey-7' : 'text-grey-5')">
            {{ roundNum }}
          </div>
          
          <div class="col-10 row justify-around">
            <template v-if="roundNum < currentRound || (roundNum === currentRound && gameStore.winnerId)">
              <div class="col-2 text-weight-bold text-grey-3" v-for="player in gameStore.players" :key="'rs'+player.id">
                {{ getScore(roundNum, player.id) }}
              </div>
            </template>
            
            <template v-else-if="roundNum === currentRound && !gameStore.winnerId">
              <div class="col-2" v-for="player in gameStore.players" :key="'ri'+player.id">
                <q-input 
                  v-model.number="currentInput[player.id]" 
                  type="number" 
                  dense 
                  outlined 
                  dark 
                  class="score-input"
                  bg-color="transparent"
                  input-class="text-center text-weight-bold"
                />
              </div>
            </template>
            
            <template v-else>
               <div class="col-2" v-for="player in gameStore.players" :key="'re'+player.id">
                <div class="empty-score-box"></div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Fixed Bottom Actions -->
    <div class="fixed-bottom q-pa-md row items-center no-wrap z-max" style="bottom: 60px;">
      <q-btn 
        v-if="!gameStore.winnerId"
        unelevated 
        color="primary" 
        class="col q-py-sm q-mr-sm text-weight-bold" 
        style="border-radius: 12px; font-size: 1.05rem;"
        @click="saveRound"
      >
        <q-icon name="save" size="xs" class="q-mr-sm" />
        Save Round {{ currentRound }}
      </q-btn>
      <q-btn 
         v-else
        unelevated 
        color="positive" 
        class="col q-py-sm q-mr-sm text-weight-bold" 
        style="border-radius: 12px; font-size: 1.05rem;"
        @click="resetGame"
      >
        <q-icon name="refresh" size="xs" class="q-mr-sm" />
        New Game
      </q-btn>
    </div>

  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useGameStore } from '../store/game'

const gameStore = useGameStore()
const totalRounds = 8

onMounted(() => {
  gameStore.startGame('fish')
})

const currentRound = computed(() => {
  return Math.min(gameStore.rounds.length + 1, totalRounds)
})

// Current round inputs mapped directly to player IDs
const currentInput = ref({
  1: 0,
  2: 0,
  3: 0,
  4: 0
})

const getScore = (roundNum, playerId) => {
  const round = gameStore.rounds.find(r => r.roundNum === roundNum)
  if (round) {
    return round.scores[playerId]
  }
  return ''
}

const getTotal = (playerId) => {
  return gameStore.totalScores[playerId]
}

const saveRound = () => {
  // Pass scores as array matching player id 1, 2, 3, 4 index
  gameStore.saveRound([
    currentInput.value[1],
    currentInput.value[2],
    currentInput.value[3],
    currentInput.value[4]
  ])

  // Reset inputs
  currentInput.value = { 1: 0, 2: 0, 3: 0, 4: 0 }
}

const resetGame = () => {
  gameStore.currentGame = null
  gameStore.startGame('fish')
}
</script>

<style scoped>
.pb-120 { padding-bottom: 120px; }
.bg-card { background-color: #171c26 !important; }
.bg-dark-lighter { background-color: #1a2235 !important; }
.border-radius-lg { border-radius: 12px; }

.current-round-highlight {
  background-color: rgba(29, 78, 216, 0.1);
  border: 1px solid rgba(29, 78, 216, 0.3);
  margin-left: -8px;
  margin-right: -8px;
}

.score-input :deep(.q-field__control) {
  border-radius: 8px;
  height: 38px;
  border-color: rgba(255,255,255,0.1);
}

.empty-score-box {
  height: 38px;
  width: 100%;
  border-radius: 8px;
  border: 1px dashed rgba(255,255,255,0.1);
}
</style>
