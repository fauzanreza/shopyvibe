import { db } from './lib/db';

async function main() {
  const store = await db.store.findFirst();
  console.log("Store found:", store?.id, store?.slug);
  if (!store) return;
  try {
    await db.store.update({
      where: { id: store.id },
      data: {
        layoutMode: "EVENT"
      }
    });
    console.log("Update layoutMode successful");
  } catch (e) {
    console.error("Update layoutMode failed", e);
  }
}
main()
