import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function Index() {
  return (
    <SafeAreaView className=" bg-background">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full bg-background p-4">
        <Text className="pb-2 text-center text-5xl font-bold text-foreground">
          Create <Text className="text-primary">T3</Text> Turbo
        </Text>

        {/* <Pressable
          onPress={() => void utils.post.all.invalidate()}
          className="flex items-center rounded-lg bg-primary p-2"
        >
          <Text className="text-foreground"> Refresh posts</Text>
        </Pressable> */}

        <View className="py-2">
          <Text className="font-semibold italic text-primary">
            Press on a post
          </Text>
        </View>

        {/* <FlashList
          data={postQuery.data}
          estimatedItemSize={20}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={(p) => (
            <PostCard
              post={p.item}
              onDelete={() => deletePostMutation.mutate(p.item.id)}
            />
          )}
        /> */}

        {/* <CreatePost /> */}
      </View>
    </SafeAreaView>
  );
}
