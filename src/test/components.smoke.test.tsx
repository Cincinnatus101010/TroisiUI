import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
	Accordion,
	Alert,
	Avatar,
	Badge,
	Box,
	Breadcrumb,
	BreadcrumbItem,
	Button,
	Card,
	Carousel,
	Checkbox,
	Chip,
	Code,
	CodeBlock,
	ColorInput,
	CommandPalette,
	Container,
	DateInput,
	Divider,
	EmptyState,
	FieldError,
	Form,
	FormField,
	Grid,
	Icon,
	Image,
	Input,
	Label,
	Lightbox,
	Link,
	List,
	ListItem,
	Menu,
	MenuItem,
	Modal,
	Navbar,
	Pagination,
	Popover,
	Progress,
	Radio,
	SearchInput,
	Select,
	Sidebar,
	SidebarItem,
	Skeleton,
	Slider,
	Spacer,
	Spinner,
	Stack,
	Stat,
	Stepper,
	Switch,
	Table,
	TableSortHeader,
	Tabs,
	TabsList,
	TabsPanel,
	TabsTrigger,
	Tag,
	Textarea,
	Timeline,
	TimelineItem,
	ToastProvider,
	Tooltip,
	Typography,
	useToast,
	Video,
	VisuallyHidden,
} from "../index";
import { renderWithTroisi } from "./render";

describe("component smoke tests", () => {
	it("renders layout primitives", () => {
		renderWithTroisi(
			<Container>
				<Box padding={4} bordered elevated rounded>
					<Stack gap={4}>
						<Grid cols={2}>
							<div>cell</div>
						</Grid>
						<Divider />
						<Spacer size={4} />
					</Stack>
				</Box>
			</Container>,
		);
		expect(document.querySelector(".troisi-container")).toBeTruthy();
		expect(document.querySelector(".troisi-grid--cols-2")).toBeTruthy();
	});

	it("renders typography and icon", () => {
		renderWithTroisi(
			<>
				<Typography variant="h1">Title</Typography>
				<Typography variant="code">npm i @troisi/ui</Typography>
				<Icon size="sm" label="dot">
					<svg viewBox="0 0 16 16" aria-hidden>
						<title>dot</title>
						<circle cx="8" cy="8" r="4" />
					</svg>
				</Icon>
			</>,
		);
		expect(screen.getByRole("heading", { name: "Title" })).toHaveClass(
			"troisi-text--h1",
		);
		expect(screen.getByText("npm i @troisi/ui").tagName).toBe("CODE");
	});

	it("renders form controls", () => {
		renderWithTroisi(
			<Form aria-label="demo">
				<FormField
					label="Email"
					htmlFor="email"
					helper="We never spam"
					error="Required"
				>
					<Input id="email" placeholder="you@example.com" />
				</FormField>
				<Label htmlFor="bio">Bio</Label>
				<Textarea id="bio" />
				<Select aria-label="plan">
					<option>Free</option>
				</Select>
				<Checkbox id="agree" label="Agree" />
				<Radio name="r" id="r1" label="A" value="a" />
				<Switch id="sw" label="On" />
				<Slider aria-label="volume" defaultValue={50} />
				<SearchInput aria-label="search" />
				<ColorInput aria-label="color" defaultValue="#000000" />
				<DateInput aria-label="date" />
				<FieldError>Bad</FieldError>
				<Button type="submit">Save</Button>
			</Form>,
		);
		expect(screen.getByRole("button", { name: "Save" })).toHaveClass(
			"troisi-button--primary",
		);
		expect(screen.getByPlaceholderText("you@example.com")).toHaveClass(
			"troisi-input",
		);
	});

	it("opens custom calendar and selects a date", async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();
		renderWithTroisi(<DateInput aria-label="Birthday" onChange={onChange} />);

		await user.click(screen.getByRole("button", { name: "Open calendar" }));
		expect(
			screen.getByRole("dialog", { name: "Choose date" }),
		).toBeInTheDocument();

		const dayButtons = screen.getAllByRole("gridcell");
		const enabled = dayButtons.find((btn) => !btn.hasAttribute("disabled"));
		if (!enabled) throw new Error("expected an enabled calendar day");
		await user.click(enabled);

		expect(onChange).toHaveBeenCalled();
		expect(onChange.mock.calls.at(-1)?.[0].target.value).toMatch(
			/^\d{4}-\d{2}-\d{2}$/,
		);
	});

	it("renders button variants including icon", () => {
		renderWithTroisi(
			<Stack direction="row" gap={2}>
				<Button variant="secondary">Sec</Button>
				<Button variant="ghost">Ghost</Button>
				<Button variant="icon" aria-label="close">
					×
				</Button>
			</Stack>,
		);
		expect(screen.getByRole("button", { name: "close" })).toHaveClass(
			"troisi-button--icon",
		);
	});

	it("renders navigation components", () => {
		renderWithTroisi(
			<>
				<Navbar brand="Troisi">nav</Navbar>
				<Sidebar>
					<SidebarItem href="#" active>
						Home
					</SidebarItem>
				</Sidebar>
				<Breadcrumb>
					<BreadcrumbItem>App</BreadcrumbItem>
				</Breadcrumb>
				<Link href="https://example.com">Docs</Link>
				<Stepper
					steps={[
						{ label: "One", status: "done" },
						{ label: "Two", status: "active" },
					]}
				/>
				<Pagination page={1} totalPages={3} onPageChange={vi.fn()} />
				<Menu trigger={<Button type="button">Menu</Button>}>
					<MenuItem>Item</MenuItem>
				</Menu>
			</>,
		);
		expect(screen.getByText("Troisi")).toHaveClass("troisi-navbar__brand");
	});

	it("switches tabs", async () => {
		const user = userEvent.setup();
		renderWithTroisi(
			<Tabs defaultValue="a">
				<TabsList>
					<TabsTrigger value="a">A</TabsTrigger>
					<TabsTrigger value="b">B</TabsTrigger>
				</TabsList>
				<TabsPanel value="a">Panel A</TabsPanel>
				<TabsPanel value="b">Panel B</TabsPanel>
			</Tabs>,
		);
		expect(screen.getByText("Panel A")).toBeInTheDocument();
		await user.click(screen.getByRole("tab", { name: "B" }));
		expect(screen.getByText("Panel B")).toBeInTheDocument();
	});

	it("renders feedback components", () => {
		renderWithTroisi(
			<>
				<Alert variant="success" heading="OK">
					Done
				</Alert>
				<Spinner label="Loading" />
				<Skeleton variant="block" />
				<Progress value={40} max={100} />
				<Tooltip tooltip="Tip">
					<Button type="button">Hover</Button>
				</Tooltip>
				<Popover trigger={<Button type="button">Pop</Button>}>
					<p>Content</p>
				</Popover>
			</>,
		);
		expect(screen.getByRole("alert")).toHaveClass("troisi-alert--success");
	});

	it("modal backdrop calls onClose", async () => {
		const user = userEvent.setup();
		const onClose = vi.fn();
		renderWithTroisi(
			<Modal open title="Hi" onClose={onClose}>
				<p>Body</p>
			</Modal>,
		);
		expect(screen.getByRole("dialog", { name: "Hi" })).toBeInTheDocument();
		await user.click(screen.getByRole("button", { name: "Close dialog" }));
		expect(onClose).toHaveBeenCalled();
	});

	it("renders data display components", () => {
		renderWithTroisi(
			<>
				<Card title="Card">Body</Card>
				<Badge variant="danger">Err</Badge>
				<Tag variant="success">Tag</Tag>
				<Chip onDismiss={vi.fn()}>Chip</Chip>
				<Avatar initials="IT" />
				<Stat label="Users" value="1.2k" />
				<List>
					<ListItem>One</ListItem>
				</List>
				<Table>
					<thead>
						<tr>
							<TableSortHeader sortDirection="asc" onSort={vi.fn()}>
								Name
							</TableSortHeader>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Ian</td>
						</tr>
					</tbody>
				</Table>
				<Timeline>
					<TimelineItem>Event</TimelineItem>
				</Timeline>
				<Accordion items={[{ id: "1", title: "Q", content: "A" }]} />
				<Carousel slides={[{ id: "s1", content: <div>Slide</div> }]} />
				<EmptyState title="Empty" description="Nothing here" />
				<Code>inline</Code>
				<CodeBlock>const x = 1;</CodeBlock>
			</>,
		);
		expect(screen.getByText("Body")).toBeInTheDocument();
		expect(document.querySelector(".troisi-badge--danger")).toBeTruthy();
	});

	it("renders media", () => {
		renderWithTroisi(
			<>
				<Image src="/x.png" alt="demo" width={100} height={100} />
				<Video aria-label="clip" />
				<Lightbox open src="/x.png" alt="zoom" onClose={vi.fn()} />
			</>,
		);
		expect(screen.getByRole("img", { name: "demo" })).toHaveClass(
			"troisi-image",
		);
	});

	it("renders utilities", () => {
		renderWithTroisi(<VisuallyHidden>Hidden</VisuallyHidden>);
		expect(screen.getByText("Hidden")).toHaveClass("troisi-visually-hidden");
	});

	it("toast provider fires toast", async () => {
		function Trigger() {
			const { toast } = useToast();
			return (
				<Button type="button" onClick={() => toast("Saved")}>
					Toast
				</Button>
			);
		}
		renderWithTroisi(
			<ToastProvider>
				<Trigger />
			</ToastProvider>,
		);
		fireEvent.click(screen.getByRole("button", { name: "Toast" }));
		await waitFor(() => expect(screen.getByText("Saved")).toBeInTheDocument());
	});

	it("command palette filters items", async () => {
		const user = userEvent.setup();
		const onClose = vi.fn();
		renderWithTroisi(
			<CommandPalette
				open
				onClose={onClose}
				items={[
					{ id: "1", label: "Alpha" },
					{ id: "2", label: "Beta" },
				]}
			/>,
		);
		const input = screen.getByPlaceholderText(/search commands/i);
		await user.type(input, "beta");
		expect(screen.getByRole("option", { name: "Beta" })).toBeInTheDocument();
		expect(
			screen.queryByRole("option", { name: "Alpha" }),
		).not.toBeInTheDocument();
	});
});
