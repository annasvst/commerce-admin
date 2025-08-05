import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ✅ Type context'i yukarıda tanımla
type BillboardRouteContext = {
  params: {
    billboardId: string;
    storeId: string;
  };
};

export async function GET(req: NextRequest, context: BillboardRouteContext) {
  try {
    const { params } = context;

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.error("[BILLBOARD_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: NextRequest, context: BillboardRouteContext) {
  try {
    const { params } = context;
    const { userId } = await auth();
    const body = await req.json();
    const { label, imageUrl } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!label) return new NextResponse("Label is required", { status: 400 });
    if (!imageUrl) return new NextResponse("Image URL is required", { status: 400 });
    if (!params.billboardId) return new NextResponse("BillboardId is required", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 });

    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: params.billboardId,
        storeId: params.storeId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.error("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: BillboardRouteContext) {
  try {
    const { params } = context;
    const { userId } = await auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!params.billboardId) return new NextResponse("BillboardId is required", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 });

    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.error("[BILLBOARD_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
