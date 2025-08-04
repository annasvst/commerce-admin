import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { colorId: string } }
) {
  try {
    const { params } = context;

    const color = await prismadb.color.findUnique({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.error("[COLORS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: { storeId: string; colorId: string } }
) {
  try {
    const { params } = context;
    const { userId } = await auth();
    const body = await req.json();
    const { name, value } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!value) return new NextResponse("Value is required", { status: 400 });
    if (!params.colorId) return new NextResponse("ColorId is required", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 });

    const color = await prismadb.color.updateMany({
      where: {
        id: params.colorId,
        storeId: params.storeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.error("[COLORS_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { storeId: string; colorId: string } }
) {
  try {
    const { params } = context;
    const { userId } = await auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!params.colorId) return new NextResponse("ColorId is required", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 });

    const color = await prismadb.color.deleteMany({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.error("[COLORS_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
