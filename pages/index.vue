<template>
<div>
  <div class='container'>
    <ul class='component-menu'>
      <li
        v-for='item in menuItems'
        :key='item.value'
        :class='["is-size-4", { "is-active": selectedMenuItem === item.value }]'
        @click='selectedMenuItem = item.value'>
        {{ item.title }}
      </li>
    </ul>
    <div class='calendars'>
      <no-ssr>
        <transition name='calendar'>
          <ex-calendar
            v-show='selectedMenuItem === "calendar"'>
          </ex-calendar>
        </transition>
      </no-ssr>
      <no-ssr>
        <transition name='datepicker'>
          <ex-date-picker
            v-show='selectedMenuItem === "datepicker"'>
          </ex-date-picker>
        </transition>
      </no-ssr>
    </div>
    <div class='buttons-container'>
      <a class='button is-primary is-large' href='https://docs.vcalendar.io'>
        Get Started
      </a>
    </div>
    <div class='info has-text-centered'>
      <div class="tags has-addons">
        <span class="tag">MIN+GZIP</span>
        <span class="tag is-dark">24.8kB</span>
      </div>
      <div class="tags has-addons">
        <span class="tag">BETA</span>
        <span class="tag is-warning">{{ version }}</span>
      </div>
      <!-- Place this tag where you want the button to render. -->
      <div>
        <a
          class='github-button'
          href='https://github.com/nathanreyes/v-calendar'
          data-size='large'
          data-show-count='true'
          aria-label='Star nathanreyes/v-calendar on GitHub'>
          Star
        </a>
      </div>
    </div>
  </div>
  <div class='banner'>
    <div class='container is-size-4'>
      <div class='columns'>
        <div class='column'></div>
        <div class='column is-one-half'>
          <p class='is-size-4 has-text-centered has-text-light'>
            Need help integrating or customizing VCalendar for your web applications?
          </p>
          <form class='form' name='help' method='POST' netlify netlify-honeypot='trigger'>
            <p class='control'>
              <input id='name' type='text' name='name' class='input' placeholder='Name'>
            </p>
            <p class='control'>
              <input id='email' type='email' name='email' class='input' placeholder='Email'>
            </p>
            <p class='control'>
              <input id='company-name' type='text' name='company name' class='input' placeholder='Company Name'>
            </p>
            <p class='control'>
              <textarea id='message' rows='3' class='textarea' placeholder='Message'></textarea>
            </p>
            <p v-show='false'>
              <input name='trigger'>
            </p>
            <p class='control'>
              <button
                type='submit'
                class='button is-light is-medium is-expanded'>
                Send
              </button>
            </p>
          </form>
        </div>
        <div class='column'></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import ExCalendar from '@/components/ExCalendar';
import ExDatePicker from '@/components/ExDatePicker';
import Package from '@/../v-calendar/package.json';

export default {
  components: {
    ExCalendar,
    ExDatePicker,
  },
  data() {
    return {
      version: Package.version,
      menuItems: [
        { title: 'Calendar', value: 'calendar' },
        { title: 'Date Picker', value: 'datepicker' },
      ],
      selectedMenuItem: 'calendar',
    };
  },
};
</script>

<style lang='scss' scoped>
@import '../assets/styles/vars.scss';

.component-menu {
  display: flex;
  justify-content: space-around;
  max-width: 400px;
  margin: 0 auto;
  li {
    display: flex;
    align-items: center;
    height: 60px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    padding: 0 10px;
    transition: all 0.13s ease-in-out;
    border: 2px solid transparent;
    &:not(:first-child) {
      margin-left: 10px;
    }
    &:hover,
    &.is-active {
      color: $accent-color;
      border-bottom: 2px solid $accent-color;
    }
    &:hover {
      color: lighten($accent-color, 20%);
      border-bottom-color: lighten($accent-color, 20%);
    }
  }
}

.body {
  position: relative;
  margin-top: 50px;
  min-height: 500px;
  max-width: 700px;
  margin: 40px auto 60px auto;
}

.calendars {
  display: flex;
  justify-content: center;
}

.buttons-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 40px;
}

.info {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  > div {
    min-height: 30px;
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
}

.calendar-enter-active,
.calendar-leave-active {
  transition: all 0.5s ease-in-out;
}

.calendar-leave-active {
  position: absolute;
}

.calendar-enter,
.calendar-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.datepicker-enter-active,
.datepicker-leave-active {
  transition: all 0.5s ease-in-out;
}

.datepicker-leave-active {
  position: absolute;
}

.datepicker-enter,
.datepicker-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.banner {
  padding: 60px 0;
  background-color: #2eacb8;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%2336c0cd' fill-opacity='0.52' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  .form {
    padding-top: 20px;
    margin: 0 auto;
    .control {
      margin-top: 10px;
    }
    .is-expanded {
      width: 100%;
    }
  }
}
</style>
