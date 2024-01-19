import { cn } from '@blackhole/cn';
// import { AffineSchemas } from '@blocksuite/blocks/models';
import { AffineEditorContainer } from '@blocksuite/presets';
import type { Page } from '@blocksuite/store';
import { Schema, Workspace } from '@blocksuite/store';
import { assertNotNull } from '@fullstacksjs/toolbox';
import {
  forwardRef,
  memo,
  Suspense,
  // @ts-expect-error missing canary types
  use,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

interface BlockElement extends Element {
  path: string[];
}

export interface EditorProps {
  page: Page;
  mode: 'edgeless' | 'page';
  defaultSelectedBlockId?: string;
  onModeChange?: (mode: 'edgeless' | 'page') => void;
  // on Editor instance instantiated
  onLoadEditor?: (editor: AffineEditorContainer) => () => void;
  style?: React.CSSProperties;
  className?: string;
}

export interface ErrorBoundaryProps {
  onReset?: () => void;
}

// a workaround for returning the webcomponent for the given block id
// by iterating over the children of the rendered dom tree
const useBlockElementById = (
  container: HTMLElement | null,
  blockId: string | undefined,
  timeout = 1000,
) => {
  const [blockElement, setBlockElement] = useState<BlockElement | null>(null);
  useEffect(() => {
    if (!blockId) {
      return;
    }

    let canceled = false;
    const start = Date.now();

    function run() {
      if (canceled || !container) {
        return;
      }

      const element = container.querySelector(`[data-block-id="${blockId}"]`);

      if (element) {
        setBlockElement(element);
      } else if (Date.now() - start < timeout) {
        setTimeout(run, 100);
      }
    }
    run();

    return () => {
      canceled = true;
    };
  }, [container, blockId, timeout]);
  return blockElement;
};

/**
 * TODO: Define error to unexpected state together in the future.
 */
export class NoPageRootError extends Error {
  constructor(public page: Page) {
    super('Page root not found when render editor!');

    // Log info to let sentry collect more message
    const hasExpectSpace = Array.from(page.rootDoc.spaces.values()).some(
      doc => page.spaceDoc.guid === doc.guid,
    );
    const blocks = page.spaceDoc.getMap('blocks');
    const havePageBlock = Array.from(blocks.values()).some(
      block => block.get('sys:flavour') === 'affine:page',
    );
    console.info(
      'NoPageRootError current data: %s',
      JSON.stringify({
        expectPageId: page.id,
        expectGuid: page.spaceDoc.guid,
        hasExpectSpace,
        blockSize: blocks.size,
        havePageBlock,
      }),
    );
  }
}

/**
 * TODO: Defined async cache to support suspense, instead of reflect symbol to provider persistent error cache.
 */
const PAGE_LOAD_KEY = Symbol('PAGE_LOAD');
const PAGE_ROOT_KEY = Symbol('PAGE_ROOT');

// function usePageRoot(page: Page) {
//   let load$ = Reflect.get(page, PAGE_LOAD_KEY);

//   if (!load$) {
//     load$ = page.load();
//     Reflect.set(page, PAGE_LOAD_KEY, load$);
//   }
//   use(load$);

//   if (!page.root) {
//     // eslint-disable-next-line fp/no-let
//     let root$: Promise<void> | undefined = Reflect.get(page, PAGE_ROOT_KEY);

//     if (!root$) {
//       root$ = new Promise((resolve, reject) => {
//         const disposable = page.slots.rootAdded.once(() => {
//           resolve();
//         });
//         window.setTimeout(() => {
//           disposable.dispose();
//           reject(new NoPageRootError(page));
//         }, 20 * 1000);
//       });
//       Reflect.set(page, PAGE_ROOT_KEY, root$);
//     }
//     use(root$);
//   }

//   return page.root;
// }

const BlockSuiteEditorImpl = forwardRef<AffineEditorContainer, EditorProps>(
  (
    {
      mode,
      page,
      className,
      defaultSelectedBlockId,
      onLoadEditor,
      onModeChange,
      style,
    },
    ref,
  ): React.ReactElement => {
    // usePageRoot(page);
    useEffect(() => {
      page.load().catch(console.error);
    }, []);

    // assertNotNull(page, 'page should not be null');
    const editorRef = useRef<AffineEditorContainer | null>(null);

    if (editorRef.current === null) {
      editorRef.current = new AffineEditorContainer();
      editorRef.current.autofocus = true;
    }

    const editor = editorRef.current;
    assertNotNull(editorRef, 'editorRef.current should not be null');

    if (editor.mode !== mode) {
      editor.mode = mode;
    }

    if (editor.page !== page) {
      editor.page = page;
    }

    if (ref) {
      if (typeof ref === 'function') {
        ref(editor);
      } else {
        ref.current = editor;
      }
    }

    useLayoutEffect(() => {
      if (editor) {
        const disposes: (() => void)[] = [];
        const disposeModeSwitch = editor.slots.pageModeSwitched.on(m => {
          onModeChange?.(m);
        });
        disposes.push(() => disposeModeSwitch.dispose());

        if (onLoadEditor) {
          disposes.push(onLoadEditor(editor));
        }

        return () => {
          disposes.forEach(dispose => dispose());
        };
      }
    }, [editor, onModeChange, onLoadEditor]);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const container = containerRef.current;

      if (!container) {
        return;
      }
      container.append(editor);

      return () => {
        editor.remove();
      };
    }, [editor]);

    const blockElement = useBlockElementById(
      containerRef.current,
      defaultSelectedBlockId,
    );

    useEffect(() => {
      if (blockElement) {
        requestIdleCallback(() => {
          blockElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
          });
          const selectManager = editor.host.selection;

          if (!blockElement.path.length || !selectManager) return;

          const newSelection = selectManager.create('block', {
            path: blockElement.path,
          });
          selectManager.set([newSelection]);
        });
      }
    }, [editor, blockElement]);

    // issue: https://github.com/toeverything/AFFiNE/issues/2004
    return (
      <div
        data-testid={`editor-${page.id}`}
        className={cn(`${editor.mode}-mode h-screen`, className)}
        style={style}
        ref={containerRef}
      />
    );
  },
);
BlockSuiteEditorImpl.displayName = 'BlockSuiteEditorImpl';

export const EditorLoading = memo(function EditorLoading() {
  return <div>Loading</div>;
});

export const DashboardPage = memo(
  forwardRef<AffineEditorContainer, EditorProps>(
    function BlockSuiteEditor(props, ref): React.ReactElement {
      const schema = new Schema();
      const workspace = new Workspace({ schema });
      const page = workspace.createPage(workspace);

      return (
        <Suspense fallback={<EditorLoading />}>
          <BlockSuiteEditorImpl
            key={page.id}
            ref={ref}
            {...props}
            page={page}
          />
        </Suspense>
      );
    },
  ),
);
