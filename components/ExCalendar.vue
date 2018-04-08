<template>
<div>
  <div class='calendar-container'>
    <v-calendar
      :attributes='attributes'
      :theme-styles='themeStyles'
      :from-page.sync='fromPage'
      :to-page.sync='toPage'
      is-double-paned>
      <!--=========POPOVER HEADER SLOT=========-->
      <div
        slot='day-popover-header'
        slot-scope='{ day }'
        class='day-popover-header'>
        {{ getPopoverHeaderLabel(day.date) }}
      </div>

      <!--============HOW TO USE ROW SLOTS===========-->
      <!--
        STEP 1: Insert element with a unique slot name ('todo-row' in this example). Make sure slot-scope is assigned, even if not used.      
        STEP 2: In Javascript, assign that unique slot name to the 'slot' property of the attribute's popover object
      -->
      <!--===============TODO ROW SLOT==============-->
      <div
        slot='todo-row'
        slot-scope='{ customData, attribute, dayInfo }'
        class='todo-row'
        :attribute='attribute'>
        <!--Todo content-->
        <div class='todo-content'>
          <!--Show textbox when editing todo-->
          <input
            class='todo-input'
            v-if='customData.id === editId'
            v-model='customData.description'
            @keyup.enter='editId = 0'
            v-focus-select />
          <!--Show status/description when not editing-->
          <span
            v-else>
            <!--Completed checkbox-->
            <input
              type='checkbox'
              v-model='customData.isComplete' />
            <!--Description-->
            <span
              :class='[
                "todo-description",
                { "complete": customData.isComplete }]'
              @click='toggleTodoComplete(customData)'>
              {{ customData.description }}
            </span>
          </span>
        </div>
        <!--Edit/Done buttons-->
        <a @click.prevent='toggleTodoEdit(customData)'>
          <!--Edit button-->
          <svg
            class='svg-icon pencil'
            viewBox='0 0 20 20'
            v-if='editId !== customData.id'>
            <path d="M19.104 0.896c-0.562-0.562-1.309-0.871-2.104-0.871s-1.542 0.309-2.104 0.871l-12.75 12.75c-0.052 0.052-0.091 0.114-0.116 0.183l-2 5.5c-0.066 0.183-0.021 0.387 0.116 0.524 0.095 0.095 0.223 0.146 0.354 0.146 0.057 0 0.115-0.010 0.171-0.030l5.5-2c0.069-0.025 0.131-0.065 0.183-0.116l12.75-12.75c0.562-0.562 0.871-1.309 0.871-2.104s-0.309-1.542-0.871-2.104zM5.725 17.068l-4.389 1.596 1.596-4.389 11.068-11.068 2.793 2.793-11.068 11.068zM18.396 4.396l-0.896 0.896-2.793-2.793 0.896-0.896c0.373-0.373 0.869-0.578 1.396-0.578s1.023 0.205 1.396 0.578c0.373 0.373 0.578 0.869 0.578 1.396s-0.205 1.023-0.578 1.396z"></path>
          </svg>
          <!--Done button-->
          <svg
            class='svg-icon check'
            v-else>
            <path d="M9.5 20c-2.538 0-4.923-0.988-6.718-2.782s-2.782-4.18-2.782-6.717c0-2.538 0.988-4.923 2.782-6.718s4.18-2.783 6.718-2.783c2.538 0 4.923 0.988 6.718 2.783s2.782 4.18 2.782 6.718-0.988 4.923-2.782 6.717c-1.794 1.794-4.18 2.782-6.718 2.782zM9.5 2c-4.687 0-8.5 3.813-8.5 8.5s3.813 8.5 8.5 8.5 8.5-3.813 8.5-8.5-3.813-8.5-8.5-8.5z"></path>
            <path d="M7.5 14.5c-0.128 0-0.256-0.049-0.354-0.146l-3-3c-0.195-0.195-0.195-0.512 0-0.707s0.512-0.195 0.707 0l2.646 2.646 6.646-6.646c0.195-0.195 0.512-0.195 0.707 0s0.195 0.512 0 0.707l-7 7c-0.098 0.098-0.226 0.146-0.354 0.146z"></path>
          </svg>
        </a>
        <!--Delete button-->
        <a
          v-if='!editId || editId !== customData.id'
          class='delete-todo'
          @click.prevent='deleteTodo(customData)'>
          <svg class='svg-icon trash' viewBox='0 0 20 20'>
            <path d='M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306'></path>
          </svg>
        </a>
      </div>
      <!--================ADD TODO ROW SLOT===============-->
      <div
        slot='add-todo'
        slot-scope='{ day }'
        class='add-todo-row'>
        <a
          class='add-todo'
          @click='addTodo(day.date)'>
          <i class='docs-calendar-plus-o'></i> Add Todo
        </a>
      </div>
    </v-calendar>
  </div>
  <div class='description content is-size-5 has-text-centered'>
    <p>
      VCalendar is a plugin for Vue.js that let's you build calendars with
        <a class='has-text-primary' href='#' @click.prevent='display = "highlights"'>highlighted&nbsp;regions</a>,
        <a class='has-text-primary' href='#' @click.prevent='display = "dots"'>dots</a>,
        <a class='has-text-primary' href='#' @click.prevent='display = "bars"'>bars</a> and even
        <a class='has-text-primary' href='#' @click.prevent='display = "popovers"'>popovers</a>.
    </p>
    <p>
      It is <a class='has-text-primary' href='https://docs.vcalendar.io' target='_blank'>well documented</a> with a <a class='has-text-primary' href='https://docs.vcalendar.io/api' target='_blank'>carefully crafted API</a> that was built with <a class='has-text-primary' href='#' @click.prevent='applyTheme'>customization</a> in mind.
    <p>
      Most importantly, it's a calendar your users will enjoy using.
    </p>
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

const color = '#ff8080';
const hSpacing = '15px';

export default {
  data() {
    return {
      display: '',
      fromPage: null,
      toPage: null,
      highlights: [
        {
          highlight: {
            backgroundColor: '#ff8080', // Red
            borderColor: '#ff6666',
            borderWidth: '2px',
            borderStyle: 'solid',
          },
          contentStyle: {
            color: 'white',
          },
          dates: [
            // Use single dates
            new Date(nextMonthYear, nextMonth, 6),
            new Date(nextMonthYear, nextMonth, 23),
            // ...or date ranges
            {
              start: new Date(thisMonthYear, thisMonth, 1),
              end: new Date(thisMonthYear, thisMonth, 4),
            },
            // ...or complex date patterns
            {
              start: new Date(thisMonthYear, thisMonth, 1),
              ordinalWeekdays: { [-1]: 7 }, // Last Saturday of the month
            },
          ],
        },
        {
          highlight: {
            backgroundColor: '#9f80ff', // Purple
            borderColor: '#8c66ff',
            borderWidth: '2px',
          },
          contentStyle: {
            color: 'white',
          },
          dates: [
            new Date(thisMonthYear, thisMonth, 1),
            new Date(thisMonthYear, thisMonth, 10),
            new Date(thisMonthYear, thisMonth, 12),
            {
              start: new Date(nextMonthYear, nextMonth, 22),
              end: new Date(nextMonthYear, nextMonth, 26),
            },
          ],
        },
        {
          highlight: {
            backgroundColor: '#66b3cc', // Turquoise
            borderColor: '#53a9c6',
            borderWidth: '2px',
            borderRadius: '5px',
          },
          contentStyle: {
            color: 'white',
          },
          dates: [
            new Date(thisMonthYear, thisMonth, 14),
            {
              start: new Date(thisMonthYear, thisMonth, 24),
              end: new Date(thisMonthYear, thisMonth, 25),
            },
            new Date(thisMonthYear, thisMonth, 28),
            new Date(nextMonthYear, nextMonth, 4),
            {
              start: new Date(nextMonthYear, nextMonth, 16),
              end: new Date(nextMonthYear, nextMonth, 17),
            },
          ],
        },
      ],
      dots: [
        {
          dot: {
            backgroundColor: '#ff4d4d', // Red
          },
          dates: [
            new Date(thisMonthYear, thisMonth, 1),
            new Date(thisMonthYear, thisMonth, 10),
            new Date(thisMonthYear, thisMonth, 22),
            new Date(nextMonthYear, nextMonth, 6),
            new Date(nextMonthYear, nextMonth, 16),
          ],
        },
        {
          dot: {
            backgroundColor: '#398fac', // Turquoise
          },
          dates: [
            new Date(thisMonthYear, thisMonth, 4),
            new Date(thisMonthYear, thisMonth, 10),
            new Date(thisMonthYear, thisMonth, 15),
            new Date(nextMonthYear, nextMonth, 1),
            new Date(nextMonthYear, nextMonth, 12),
            {
              start: new Date(nextMonthYear, nextMonth, 20),
              end: new Date(nextMonthYear, nextMonth, 25),
            },
          ],
        },
        {
          dot: {
            backgroundColor: '#794dff', // Purple
          },
          dates: [
            new Date(thisMonthYear, thisMonth, 12),
            new Date(thisMonthYear, thisMonth, 26),
            new Date(thisMonthYear, thisMonth, 15),
            new Date(nextMonthYear, nextMonth, 9),
            new Date(nextMonthYear, nextMonth, 5),
            new Date(nextMonthYear, nextMonth, 6),
            new Date(nextMonthYear, nextMonth, 20),
            new Date(nextMonthYear, nextMonth, 25),
          ],
        },
      ],
      bars: [
        {
          bar: {
            backgroundColor: '#ff4d4d', // Red
          },
          dates: [
            new Date(thisMonthYear, thisMonth, 1),
            new Date(thisMonthYear, thisMonth, 10),
            new Date(thisMonthYear, thisMonth, 22),
            new Date(nextMonthYear, nextMonth, 6),
            new Date(nextMonthYear, nextMonth, 16),
          ],
        },
        {
          bar: {
            backgroundColor: '#398fac', // Turquoise
          },
          dates: [
            new Date(thisMonthYear, thisMonth, 4),
            new Date(thisMonthYear, thisMonth, 10),
            new Date(thisMonthYear, thisMonth, 15),
            new Date(nextMonthYear, nextMonth, 1),
            new Date(nextMonthYear, nextMonth, 12),
            {
              start: new Date(nextMonthYear, nextMonth, 20),
              end: new Date(nextMonthYear, nextMonth, 25),
            },
          ],
        },
        {
          bar: {
            backgroundColor: '#794dff', // Purple
          },
          dates: [
            new Date(thisMonthYear, thisMonth, 12),
            new Date(thisMonthYear, thisMonth, 26),
            new Date(thisMonthYear, thisMonth, 15),
            new Date(nextMonthYear, nextMonth, 9),
            new Date(nextMonthYear, nextMonth, 5),
            new Date(nextMonthYear, nextMonth, 6),
            new Date(nextMonthYear, nextMonth, 20),
            new Date(nextMonthYear, nextMonth, 25),
          ],
        },
      ],
      incId: 5,
      editId: 0,
      todos: [
        {
          id: 1,
          description: 'Take Noah to basketball practice.',
          isComplete: false,
          dates: new Date(thisMonthYear, thisMonth, 1),
        },
        {
          id: 2,
          description: 'Get some milks.',
          isComplete: false,
          dates: new Date(thisMonthYear, thisMonth, 5),
        },
        {
          id: 3,
          description: 'Pay the utility bill.',
          isComplete: false,
          dates: new Date(thisMonthYear, thisMonth, 19),
        },
        {
          id: 4,
          description: 'Pick up clothes from the cleaners.',
          isComplete: false,
          dates: new Date(thisMonthYear, thisMonth, 19),
        },
        {
          id: 5,
          description: 'Lunch with Leo.',
          isComplete: false,
          dates: new Date(thisMonthYear, thisMonth, 22),
        },
      ],
      themeStyles: null,
    };
  },
  computed: {
    attributes() {
      switch (this.display) {
        case 'highlights':
          return this.highlights;
        case 'dots':
          return this.dots;
        case 'bars':
          return this.bars;
        case 'popovers':
          return this.popovers;
        default:
          return null;
      }
    },
    popovers() {
      return [
        // Todo attributes
        ...this.todos.map(todo => ({
          key: todo.id,
          dates: todo.dates,
          customData: todo,
          order: todo.id,
          dot: {
            backgroundColor: color,
            opacity: todo.isComplete ? 0.3 : 1,
          },
          popover: {
            slot: 'todo-row', // Matches slot from above
            visibility: 'focus',
          },
        })),
        // 'Add todo' attribute
        {
          key: -1,
          contentHoverStyle: {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
          },
          dates: {},
          popover: {
            slot: 'add-todo',
            visibility: 'focus',
            hideIndicator: true,
          },
        },
      ];
    },
  },
  watch: {
    display() {
      this.resetPages();
    },
  },
  methods: {
    resetPages() {
      this.fromPage = { month: thisMonth + 1, year: thisMonthYear };
      this.toPage = { month: nextMonth + 1, year: nextMonthYear };
    },
    getPopoverHeaderLabel(date) {
      const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      };
      return date.toLocaleDateString(
        window.navigator.userLanguage || window.navigator.language,
        options,
      );
    },
    addTodo(date) {
      this.editId = ++this.incId;
      this.todos.push({
        id: this.editId,
        description: 'New todo',
        isComplete: false,
        dates: date,
      });
    },
    toggleTodoComplete(todo) {
      todo.isComplete = !todo.isComplete;
    },
    toggleTodoEdit(todo) {
      this.editId = this.editId === todo.id ? 0 : todo.id;
    },
    deleteTodo(todo) {
      this.todos = this.todos.filter(t => t.id !== todo.id);
    },
    applyTheme() {
      this.themeStyles = this.themeStyles
        ? null
        : {
            wrapper: {
              border: '0',
              background: 'linear-gradient(to bottom right, #ff5050, #ff66b3)',
              boxShadow:
                '0 4px 8px 0 rgba(0, 0, 0, 0.14), 0 6px 20px 0 rgba(0, 0, 0, 0.13)',
              borderRadius: '5px',
            },
            verticalDivider: {
              borderLeft: 'solid rgba(255, 255, 255, 0.2) 1px',
            },
            header: {
              color: '#fafafa',
              padding: `20px ${hSpacing}`,
            },
            headerHorizontalDivider: {
              borderTop: 'solid rgba(255, 255, 255, 0.2) 1px',
              width: '80%',
            },
            weekdays: {
              color: '#6eded1',
              fontWeight: '600',
              padding: `20px ${hSpacing} 5px ${hSpacing}`,
            },
            weeks: {
              padding: `0 ${hSpacing} 10px ${hSpacing}`,
            },
            dayContent: {
              color: '#fafafa',
              fontSize: '0.9em',
            },
            dayContentHover: {
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
            },
            bars: {
              marginBottom: '1px',
              width: '60%',
            },
          };
    },
  },
  directives: {
    focusSelect: {
      inserted(el) {
        el.focus();
        el.select();
      },
    },
  },
};
</script>

<style lang='scss' scoped>
@import '../assets/styles/vars.scss';

.day-popover-header {
  text-align: center;
  padding-bottom: 3px;
  border-bottom: 1px solid #dadada;
  margin: 0 0 3px 0;
  opacity: 0.7;
}

.todo-row {
  display: flex;
  align-items: center;
  flex-wrap: none;
  width: 100%;
}

.todo-content {
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  margin-right: 10px;
  min-width: 80px;
  .todo-input {
    width: 100%;
    min-width: 200px;
  }
  .todo-description {
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    margin-left: 3px;
    &:hover {
      opacity: 0.5;
    }
    &.complete {
      text-decoration: line-through;
    }
  }
}

.add-todo-row {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.add-todo {
  font-size: 0.8rem;
  text-align: center;
  cursor: pointer;
  padding: 0 3px;
  &:hover {
    opacity: 0.8;
  }
}

.svg-icon {
  cursor: pointer;
  transition: opacity 0.14s ease-in-out;
  &:hover {
    opacity: 0.5;
  }
  &.pencil {
    width: 1.2em;
    height: 1.2em;
    path {
      fill: $blue-color;
    }
  }
  &.trash {
    width: 1.4em;
    height: 1.4em;
    margin-left: 5px;
    path {
      fill: $red-color;
    }
  }
  &.check {
    width: 1.6em;
    height: 1.6em;
    path {
      fill: $green-color;
    }
  }
}
</style>
