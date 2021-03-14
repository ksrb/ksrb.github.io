import { throttle } from "lodash";
import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { navbarHeight } from "src/components/Navbar/styles";
import {
  aboutListenerId,
  experiencesListenerId,
  providerListenerId,
  skillsListenerId,
} from "src/constants";
import { RequiredByElsePartial } from "src/types";

type Listener = (
  scrollElementTrackerListenerMap: ScrollElementTrackerListenerMap,
) => void;

type ScrollElementTrackerListener = {
  id: number;
  element?: HTMLElement;
  listener?: Listener;
  inViewPort?: boolean;
};

export type ScrollElementTrackerListenerMap = {
  [key: number]: ScrollElementTrackerListener;
};

const context = createContext<ScrollElementTrackerListenerMap>({});

const { Provider } = context;

/**
 * Checks if any part of the given element is in the viewport
 * From:
 * https://stackoverflow.com/questions/487073/how-to-check-if-element-is-visible-after-scrolling#comment45659737_22480938
 * @param element
 */
function isElementInViewport(element: HTMLElement) {
  const { top, bottom } = element.getBoundingClientRect();
  return top < window.innerHeight && bottom >= navbarHeight;
}

class ScrollManager {
  scrollElementTrackerListenerMap: ScrollElementTrackerListenerMap = {};

  addListener(
    scrollElementTrackerListener: RequiredByElsePartial<
      ScrollElementTrackerListener,
      "id"
    >,
  ) {
    const { id } = scrollElementTrackerListener;

    if (!this.scrollElementTrackerListenerMap[id]) {
      this.scrollElementTrackerListenerMap[id] = {
        ...scrollElementTrackerListener,
      };
    }

    Object.entries(scrollElementTrackerListener).forEach(([key, value]) => {
      // @ts-ignore
      this.scrollElementTrackerListenerMap[id][key] = value;
    });
  }

  callListener(id: ScrollElementTrackerListener["id"]) {
    const { listener } = this.scrollElementTrackerListenerMap[id];
    if (listener) {
      listener(this.scrollElementTrackerListenerMap);
    }
  }

  callListeners() {
    let hasChanges = false;
    Object.values(this.scrollElementTrackerListenerMap).forEach(
      (scrollElementTrackerListener) => {
        const { element } = scrollElementTrackerListener;

        let onScreen = scrollElementTrackerListener.inViewPort;
        if (element) {
          onScreen = isElementInViewport(element);
        }

        if (onScreen !== scrollElementTrackerListener.inViewPort) {
          scrollElementTrackerListener.inViewPort = onScreen;
          hasChanges = true;
        }
      },
    );

    if (hasChanges) {
      Object.values(this.scrollElementTrackerListenerMap).forEach(({ id }) =>
        this.callListener(id),
      );
    }
  }

  addWindowScrollListener() {
    window.addEventListener(
      "scroll",
      throttle(
        () => this.callListeners(),
        // 30 FPS
        1000 / 30,
      ),
    );
  }
}

export const scrollElementTrackerManager = new ScrollManager();
scrollElementTrackerManager.addListener({ id: skillsListenerId });
scrollElementTrackerManager.addListener({ id: experiencesListenerId });
scrollElementTrackerManager.addListener({ id: aboutListenerId });

export function useScrollElementTrackerRefCallback(
  id: ScrollElementTrackerListener["id"],
) {
  scrollElementTrackerManager.addListener({ id });

  return useCallback(
    (element: HTMLDivElement) => {
      if (!element) {
        return;
      }
      scrollElementTrackerManager.addListener({ id, element });
    },
    [id],
  );
}

export function useScrollElementTracker() {
  return useContext(context);
}

export type ScrollElementTrackerProps = {
  scrollElementTrackerRef: ReturnType<
    typeof useScrollElementTrackerRefCallback
  >;
};

export function withScrollElementTracker<T extends ScrollElementTrackerProps>(
  Component: FC<T>,
  id: number,
) {
  const Wrapper: FC<Omit<T, "scrollElementTrackerRef">> = (props) => {
    scrollElementTrackerManager.addListener({ id });
    const ref = useScrollElementTrackerRefCallback(id);

    // Typecasting used as generic type cannot be determined see
    // https://stackoverflow.com/a/60735856
    return <Component {...(props as T)} scrollElementTrackerRef={ref} />;
  };
  return Wrapper;
}

const ScrollElementTracker: FC = ({ children }) => {
  const [
    scrollElementTrackerListenerMap,
    setScrollElementTrackerListenerMap,
  ] = useState<ScrollElementTrackerListenerMap>(
    scrollElementTrackerManager.scrollElementTrackerListenerMap,
  );

  useEffect(() => {
    scrollElementTrackerManager.addWindowScrollListener();
    scrollElementTrackerManager.addListener({
      id: providerListenerId,
      listener: (scrollElementTrackerListenerMap) => {
        setScrollElementTrackerListenerMap({
          ...scrollElementTrackerListenerMap,
        });
      },
    });
    scrollElementTrackerManager.callListeners();
  }, []);

  return (
    <Provider value={scrollElementTrackerListenerMap}>{children}</Provider>
  );
};

export default ScrollElementTracker;
