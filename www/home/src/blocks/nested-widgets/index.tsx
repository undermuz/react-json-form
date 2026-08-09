import { useEffect, useState, type FC, type ReactNode } from "react";
import JsonForm, {
    EnumSchemeItemType,
    UiContext,
    type IScheme,
    type ISchemeItem,
} from "@undermuz/react-json-form";
import BaseTheme from "@undermuz/react-json-form-theme-base";
import type { IBlock } from "@undermuz/react-page-builder";
import CodePanel from "../../components/CodePanel";

/** One node in a recursive widget tree — children may nest at runtime. */
export type NestNode = {
    /** Required by react-json-form ArrayForm for Widget(multiple) items */
    id: number;
    label: string;
    note: string;
    children: NestNode[];
};

export type NestedWidgetsValue = {
    title: string;
    body: string;
    root: NestNode;
    snippet: string;
};

const MAX_SCHEME_DEPTH = 5;

function nestScheme(depth: number): ISchemeItem[] {
    const fields: ISchemeItem[] = [
        {
            name: "label",
            title: "Label",
            type: EnumSchemeItemType.Text,
            def_value: "",
        },
        {
            name: "note",
            title: "Note",
            type: EnumSchemeItemType.Text,
            def_value: "",
        },
    ];

    if (depth > 1) {
        fields.push({
            name: "children",
            title: `Nested widgets (depth ${MAX_SCHEME_DEPTH - depth + 2})`,
            type: EnumSchemeItemType.Widget,
            multiple: true,
            scheme: nestScheme(depth - 1),
        });
    }

    return fields;
}

const liveScheme: IScheme = {
    id: "nested-widgets-live",
    title: "Nested tree",
    multiple: false,
    scheme: nestScheme(MAX_SCHEME_DEPTH),
};

const DEF_VALUE: NestedWidgetsValue = {
    title: "Nested widgets → nested JSON",
    body: "EnumSchemeItemType.Widget can embed another Widget. Model addresses, line items, or CMS trees — the value stays a plain JSON object/array.",
    root: {
        id: 1,
        label: "Customer profile",
        note: "Root object in the form value",
        children: [
            {
                id: 2,
                label: "Billing address",
                note: "Widget field: address",
                children: [
                    {
                        id: 3,
                        label: "Street lines",
                        note: "Widget(multiple) under address",
                        children: [
                            {
                                id: 4,
                                label: "Line 1",
                                note: "Leaf text fields live here",
                                children: [
                                    {
                                        label: "Way",
                                        note: "127",
                                        id: 1,
                                        children: [],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    snippet: `{
  name: "address",
  title: "Billing address",
  type: EnumSchemeItemType.Widget,
  multiple: false,
  scheme: [
    { name: "city", type: EnumSchemeItemType.Text },
    { name: "zip", type: EnumSchemeItemType.Text },
    {
      name: "lines",
      title: "Street lines",
      type: EnumSchemeItemType.Widget,
      multiple: true,
      scheme: [
        { name: "text", type: EnumSchemeItemType.Text },
        {
          name: "meta",
          type: EnumSchemeItemType.Widget,
          multiple: false,
          scheme: [
            { name: "label", type: EnumSchemeItemType.Text },
          ],
        },
      ],
    },
  ],
}
// Array widget items need a unique numeric id in the value.`,
};

const scheme: IScheme = {
    id: "nested-widgets",
    title: "Nested widgets",
    multiple: false,
    scheme: [
        {
            name: "title",
            title: "Title",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.title,
        },
        {
            name: "body",
            title: "Body",
            type: EnumSchemeItemType.TextBlock,
            def_value: DEF_VALUE.body,
        },
        {
            name: "root",
            title: "Root widget",
            type: EnumSchemeItemType.Widget,
            multiple: false,
            scheme: nestScheme(MAX_SCHEME_DEPTH),
        },
        {
            name: "snippet",
            title: "Scheme snippet",
            type: EnumSchemeItemType.TextBlock,
            def_value: DEF_VALUE.snippet,
        },
    ],
};

function NestTree({
    node,
    depth = 0,
}: {
    node: NestNode;
    depth?: number;
}): ReactNode {
    const kids = Array.isArray(node.children) ? node.children : [];

    return (
        <li className="list-none">
            <div
                className="glass glass-hover rounded-xl px-4 py-3"
                style={{ marginLeft: depth * 12 }}
            >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-rpb-secondary">
                        depth {depth}
                    </span>
                    <p className="font-semibold text-rpb-text">{node.label}</p>
                </div>
                {node.note ? (
                    <p className="mt-1 font-mono text-sm text-rpb-muted">
                        {node.note}
                    </p>
                ) : null}
            </div>
            {kids.length > 0 ? (
                <ul className="mt-2 space-y-2 border-l border-rpb-border/80 pl-3 sm:pl-4">
                    {kids.map((child) => (
                        <NestTree
                            key={child.id}
                            node={child}
                            depth={depth + 1}
                        />
                    ))}
                </ul>
            ) : null}
        </li>
    );
}

function normalizeRoot(root: NestNode | undefined): NestNode {
    if (!root) return structuredClone(DEF_VALUE.root);
    return {
        ...DEF_VALUE.root,
        ...root,
        children: Array.isArray(root.children) ? root.children : [],
    };
}

const NestedWidgetsView: FC<{ id?: number; value?: NestedWidgetsValue }> = ({
    value,
}) => {
    const v = {
        ...DEF_VALUE,
        ...value,
        root: normalizeRoot(value?.root),
    };

    const [formValue, setFormValue] = useState<NestNode>(() =>
        structuredClone(v.root),
    );

    const seedKey = JSON.stringify(value?.root ?? DEF_VALUE.root);
    useEffect(() => {
        setFormValue(structuredClone(normalizeRoot(value?.root)));
        // Sync when block seed changes (page edit / reset), not on local form typing.
        // eslint-disable-next-line react-hooks/exhaustive-deps -- seedKey captures root
    }, [seedKey]);

    return (
        <section className="w-full px-4 py-12 sm:px-6 sm:py-16">
            <div className="mx-auto max-w-6xl">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-rpb-secondary">
                    Nesting
                </p>
                <h2 className="mt-2 font-sans text-2xl font-semibold tracking-tight sm:text-3xl">
                    {v.title}
                </h2>
                <p className="mt-3 max-w-3xl font-mono text-sm leading-relaxed text-rpb-muted">
                    {v.body}
                </p>

                <div className="mt-8 grid gap-8 lg:grid-cols-2">
                    <div className="min-w-0">
                        <p className="mb-3 font-mono text-xs uppercase tracking-wider text-rpb-secondary">
                            Live form
                        </p>
                        <div
                            className="rjf-live-demo glass rounded-2xl p-5 sm:p-6"
                            data-rjf-live-demo
                        >
                            <UiContext.Provider value={BaseTheme}>
                                <JsonForm
                                    {...liveScheme}
                                    value={formValue}
                                    onChange={setFormValue}
                                />
                            </UiContext.Provider>
                        </div>
                        <p className="mt-4 mb-2 font-mono text-xs uppercase tracking-wider text-rpb-secondary">
                            Value shape
                        </p>
                        <ul className="space-y-2">
                            <NestTree node={formValue} />
                        </ul>
                    </div>
                    <div className="min-w-0">
                        <p className="mb-3 font-mono text-xs uppercase tracking-wider text-rpb-secondary">
                            Scheme pattern
                        </p>
                        <CodePanel
                            filename="nested-scheme.ts"
                            code={v.snippet}
                        />
                        <div className="mt-4">
                            <CodePanel
                                filename="value.json"
                                language="json"
                                code={JSON.stringify(formValue, null, 2)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const NestedWidgetsBlock: IBlock<NestedWidgetsValue> = {
    id: "nested-widgets",
    title: "Nested widgets",
    description: "Demo of Widget inside Widget nesting",
    image: "",
    value: DEF_VALUE,
    scheme,
    view: NestedWidgetsView,
};

export default NestedWidgetsBlock;
