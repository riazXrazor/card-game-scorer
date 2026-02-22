<template>
  <q-layout view="hHh lpR fFf" class="mobile-layout text-white">
    
    <!-- Header -->
    <q-header class="bg-dark text-white" style="border-bottom: 1px solid rgba(255,255,255,0.05)">
      <q-toolbar class="q-py-md">
        <!-- Menu/Back Icon -->
        <q-btn v-if="route.name === 'home'" flat round dense icon="menu" color="grey-5" />
        <q-btn v-else flat round dense icon="arrow_back" color="grey-5" @click="$router.push('/')" />
        
        <!-- App Title (if home) / Game Title (if game) -->
        <q-toolbar-title class="text-center text-weight-bold row justify-center items-center" style="font-size: 1.1rem; letter-spacing: 0.3px;">
          <template v-if="route.name !== 'home'">
            <q-icon :name="route.name === 'fish' ? 'tsunami' : 'style'" color="primary" class="q-mr-sm" size="sm" />
          </template>
          {{ appTitle }}
        </q-toolbar-title>

        <!-- Right Icons -->
        <template v-if="route.name === 'home'">
          <q-btn flat round dense icon="notifications" color="grey-5">
            <q-badge color="accent" floating rounded />
          </q-btn>
        </template>
        <template v-else>
           <q-btn v-if="route.name === 'fish'" flat round dense icon="history" color="grey-5" class="q-mr-xs" />
           <q-btn v-else flat round dense icon="sync" color="grey-5" class="q-mr-xs" />
           
           <q-btn flat round dense icon="settings" color="grey-5" />
        </template>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-dark-page">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>

    <!-- Bottom Navigation -->
    <q-footer class="bg-dark" style="border-top: 1px solid rgba(255,255,255,0.05)">
      <q-tabs
        v-model="tab"
        class="text-grey-6 q-py-xs"
        active-color="primary"
        indicator-color="transparent"
        inline-label={false}
        mobile-arrows={false}
        dense
      >
        <template v-if="route.name === 'home'">
          <q-route-tab name="home" icon="home" label="HOME" to="/" class="nav-tab text-caption text-weight-bold" />
          <q-route-tab name="history" icon="history" label="HISTORY" class="nav-tab text-caption text-weight-bold" />
          <q-route-tab name="settings" icon="settings" label="SETTINGS" class="nav-tab text-caption text-weight-bold" />
        </template>
        
        <template v-else-if="route.name === 'fish'">
          <q-route-tab name="scores" icon="bar_chart" label="SCORES" class="nav-tab text-caption text-weight-bold text-primary" />
          <q-route-tab name="games" icon="history" label="GAMES" class="nav-tab text-caption text-weight-bold" />
          <q-route-tab name="rules" icon="menu_book" label="RULES" class="nav-tab text-caption text-weight-bold" />
        </template>

        <template v-else-if="route.name === 'hajari'">
          <q-route-tab name="game" icon="bar_chart" label="GAME" class="nav-tab text-caption text-weight-bold text-primary" />
          <q-route-tab name="history" icon="history" label="HISTORY" class="nav-tab text-caption text-weight-bold" />
          <q-route-tab name="players" icon="group" label="PLAYERS" class="nav-tab text-caption text-weight-bold" />
          <q-route-tab name="settings" icon="settings" label="SETTINGS" class="nav-tab text-caption text-weight-bold" />
        </template>
        
      </q-tabs>
    </q-footer>

  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const tab = ref('home')

const appTitle = computed(() => {
  if (route.name === 'home') return 'Choose Your Game'
  if (route.name === 'fish') return 'Fish Scorer'
  if (route.name === 'hajari') return 'Hajari Scorer'
  return 'Card Scorer'
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

html, body {
  background-color: #0b1120;
  color: white;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  margin: 0;
  padding: 0;
}

.mobile-layout {
  max-width: 500px;
  margin: 0 auto;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
  min-height: 100vh;
}

.bg-dark { background-color: #121827 !important; }
.bg-dark-page { background-color: #0b1120 !important; }

/* Override Quasar tab styling for the mockups */
.q-tab__icon { font-size: 20px !important; margin-bottom: 2px; }
.q-tab__label { font-size: 0.65rem !important; letter-spacing: 0.5px; }
.q-tab { min-height: 60px; }

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
