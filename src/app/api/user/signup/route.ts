import dbConnect from "@/lib/db";

export const POST = async (request: Request) => {
  await dbConnect();

  try {
    const reqData = request.json();
    console.log(reqData);
  } catch (error) {
    return Response.json({ success: false, error: error }, { status: 500 });
  }
};
