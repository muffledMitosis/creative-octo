function SectionBtn({ text, selected = false }) {
  return (
    <div className={(selected ? "bg-octo-dark-purple text-white " : "bg-octo-yellow text-black ") + " rounded-lg px-16 py-3 font-bold text-center"}>
      {text}
    </div>
  );
}
export default function LeftBar() {
  return (
    <div className="flex flex-col gap-4 w-72">
      <SectionBtn text="My Requests" selected={true} />
      <SectionBtn text="Payments" />
      <SectionBtn text="My Brands" />
      <SectionBtn text="Billing Information" />
      <SectionBtn text="Support Chat" />
    </div>
  );
}
