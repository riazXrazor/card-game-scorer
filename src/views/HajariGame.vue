<template>
  <q-page class="q-pa-md pb-120">
    
    <!-- Leaderboard Header -->
    <div class="row items-center justify-between q-mb-md">
      <div class="text-caption text-weight-bold text-grey-5 text-uppercase" style="letter-spacing: 1px">Leaderboard</div>
      <q-badge color="primary" class="text-weight-bold q-px-sm" style="background: rgba(29, 78, 216, 0.2) !important; color: #60a5fa !important;">Goal: 1000</q-badge>
    </div>

    <!-- Player Cards -->
    <div class="q-gutter-y-md q-mb-xl">
      <q-card v-for="(player, index) in players" :key="index" class="bg-card border-radius-lg q-pa-md" flat bordered style="border-color: rgba(255,255,255,0.05)">
        <div class="row justify-between q-mb-sm">
          <div>
             <div class="text-h6 text-weight-bold row items-center">
              {{ player.name }}
              <q-icon v-if="player.isLeader" name="emoji_events" color="warning" size="xs" class="q-ml-sm" />
             </div>
             <div class="text-caption text-grey-5">{{ player.status }}</div>
          </div>
          <div class="text-right">
             <div class="text-h5 text-weight-bolder" :class="player.isLeader ? 'text-primary' : 'text-white'">{{ player.score }}</div>
             <div class="text-caption text-grey-5">/ 1000</div>
          </div>
        </div>
        
        <q-linear-progress :value="player.score / 1000" :color="player.isLeader ? 'primary' : 'grey-7'" track-color="dark-lighter" size="8px" style="border-radius: 4px" class="q-mt-md q-mb-sm" />
        
        <div class="row justify-between text-caption text-weight-bold text-uppercase" style="font-size: 0.65rem">
          <span class="text-grey-5">{{ Math.round((player.score / 1000) * 100) }}% Complete</span>
          <span class="text-grey-3">{{ 1000 - player.score }} To Win</span>
        </div>
      </q-card>
    </div>

    <!-- Round History Header -->
    <div class="row items-center justify-between q-mb-md">
      <div class="text-caption text-weight-bold text-grey-5 text-uppercase" style="letter-spacing: 1px">Round History</div>
      <div class="text-primary text-caption text-weight-bold">View All</div>
    </div>

    <!-- History Table -->
    <q-card class="bg-card border-radius-lg overflow-hidden" flat style="border: 1px solid rgba(255,255,255,0.05)">
      <table class="full-width history-table">
        <thead>
          <tr class="text-left text-grey-5 text-caption text-weight-bold">
            <th class="q-pa-md">ROUND</th>
            <th class="q-pa-md">P1 SCORE</th>
            <th class="q-pa-md text-right">P2 SCORE</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="round in roundHistory" :key="round.round" class="text-caption text-weight-bolder">
            <td class="q-pa-md text-grey-5 text-italic">Round {{ round.round }}</td>
            <td class="q-pa-md" :class="round.p1 === '+250' ? 'text-primary' : 'text-white'">{{ round.p1 }}</td>
            <td class="q-pa-md text-right" :class="round.p2 === '+250' ? 'text-primary' : 'text-white'">{{ round.p2 }}</td>
          </tr>
        </tbody>
      </table>
    </q-card>

    <!-- FAB -->
    <q-page-sticky position="bottom-right" :offset="[20, 80]" class="z-top">
      <q-btn fab icon="add" color="primary" class="shadow-10" size="lg" />
    </q-page-sticky>

  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const players = ref([
  { name: 'Player 1', status: 'Current Lead', score: 740, isLeader: true },
  { name: 'Player 2', status: 'Trailing', score: 520, isLeader: false }
])

const roundHistory = ref([
  { round: 4, p1: '+210', p2: '+140' },
  { round: 3, p1: '+180', p2: '+250' },
  { round: 2, p1: '+250', p2: '+80' },
  { round: 1, p1: '+100', p2: '+50' }
])
</script>

<style scoped>
.pb-120 { padding-bottom: 120px; }
.bg-card { background-color: #171c26 !important; }
.bg-dark-lighter { background-color: #21293a !important; }
.border-radius-lg { border-radius: 12px; }

.history-table { border-collapse: collapse; }
.history-table th, .history-table td {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.history-table tbody tr:last-child td {
  border-bottom: none;
}
</style>
