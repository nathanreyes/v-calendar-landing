<template>
<div>
  <div class='calendar-container'>
    <v-date-picker
      :mode='mode'
      v-model='date'
      :disabled-dates='disabledDates'
      :from-page.sync='fromPage'
      :to-page.sync='toPage'
      is-double-paned
      is-inline
      show-caps>
    </v-date-picker>
  </div>
  <div class='columns'>
    <div class='column'></div>
    <div class='column is-two-thirds content is-size-5 has-text-centered'>
      <p>
        Oh, and there's a date picker that can do everything VCalendar can do with extra support for
        <a class='has-text-primary' href='#' @click.prevent='enableSingleMode'>single date</a>,
        <a class='has-text-primary' href='#' @click.prevent='enableMultipleMode'>multiple date</a> and
        <a class='has-text-primary' href='#' @click.prevent='enableRangeMode'>date range</a> selections.
      </p>
      <p>
        You can even disable complex date patterns like
        <a class='has-text-primary' href='#' @click.prevent='disableWeekends'>weekends</a>,
        <a class='has-text-primary' href='#' @click.prevent='disableDays'>the 1st and 15th</a> or the
        <a class='has-text-primary' href='#' @click.prevent='disableOrdinalWeekdays'>last Saturday</a> of every month.
      </p>
      <p>
        So...date pickers don't have to be boring after all.
      </p>
    </div>
    <div class='column'></div>
  </div>
</div>
</template>

<script>
import { getExampleMonthComps } from '@/util/helpers';

const {
  thisMonth,
  thisMonthYear,
  nextMonth,
  nextMonthYear,
} = getExampleMonthComps();

export default {
  data() {
    return {
      date: null,
      mode: 'single',
      fromPage: null,
      toPage: null,
      disabledDates: null,
    };
  },
  watch: {
    mode() {
      this.resetPages();
    },
  },
  mounted() {
    this.enableRangeMode();
  },
  methods: {
    resetPages() {
      this.fromPage = { month: thisMonth + 1, year: thisMonthYear };
      this.toPage = { month: nextMonth + 1, year: nextMonthYear };
    },
    enableSingleMode() {
      this.mode = 'single';
      this.$nextTick(() => (this.date = new Date()));
    },
    enableMultipleMode() {
      this.mode = 'multiple';
      this.$nextTick(
        () =>
          (this.date = [
            new Date(thisMonthYear, thisMonth, 3),
            new Date(thisMonthYear, thisMonth, 15),
            new Date(thisMonthYear, thisMonth, 25),
            new Date(nextMonthYear, nextMonth, 2),
          ]),
      );
    },
    enableRangeMode() {
      this.mode = 'range';
      this.$nextTick(
        () =>
          (this.date = {
            start: new Date(thisMonthYear, thisMonth, 6),
            end: new Date(thisMonthYear, thisMonth, 23),
          }),
      );
    },
    disableWeekends() {
      this.disabledDates = { weekdays: [1, 7] };
    },
    disableDays() {
      this.disabledDates = { days: [1, 15] };
    },
    disableOrdinalWeekdays() {
      this.disabledDates = { ordinalWeekdays: { [-1]: 7 } };
    },
  },
};
</script>
